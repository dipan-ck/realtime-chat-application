import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getAllUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("api/message/users");
      console.log('API response for users:', res.data);
      if (!Array.isArray(res.data)) {
        console.error('API response is not an array:', res.data);
      }
      set({ users: Array.isArray(res.data) ? res.data : [] }); // Ensure users is an array
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance(`api/message/${userId}`);
      set({ messages: Array.isArray(res.data) ? res.data : [] }); // Ensure messages is an array
    } catch (error) {
      toast.error(error.res.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const socket = useAuthStore.getState().socket; // ✅ Get socket instance

    if (!selectedUser || !selectedUser._id) {
      toast.error("No user selected.");
      return;
    }

    try {
      const tempMessage = {
        ...messageData,
        receiverId: selectedUser._id,
        _id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      set((state) => ({ messages: [...state.messages, tempMessage] }));

      const res = await axiosInstance.post(`api/message/send/${selectedUser._id}`, messageData);

      // Replace temp message with actual server response
      set((state) => ({
        messages: state.messages.map((msg) => (msg._id === tempMessage._id ? res.data : msg)),
      }));

      socket.emit("newMessage", res.data); //
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      set((state) => ({ messages: [...state.messages, newMessage] })); // ✅ Use function to correctly append new messages
    });
  },

  setSelectedUsertoChat: (user) => {
    set({ selectedUser: user });
    get().subscribeToMessages();
  },
}));
