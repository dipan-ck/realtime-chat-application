import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =import.meta.env.MODE === "development" ? "http://localhost:3000": "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningup: false,
  isLoggingin: false,
  isUpdatingProfile: false,
  allUsers: null,
  isCheckingAuth: true,
  selectedUsertoChat: null,
  isSidebarOpen: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      console.log({ authUser: error });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstance.post("/api/auth/signup", formData);
      toast.success("Account created Successfully");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningup: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully");
      get().disConnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (formData) => {
    try {
      set({ isLoggingin: true });
      const res = await axiosInstance.post("/api/auth/login", formData);
      toast.success("Logged in Successfully");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingin: false });
    }
  },

  updateProfile: async (formData) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/api/auth/update-profile", formData);
      set({ authUser: res.data });
      toast.success("Profile updated Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  setIsSidebarOpen: (isSidebarOpen) => {
    set({ isSidebarOpen: !isSidebarOpen });
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser) {
      return;
    }

    const socket = io(BASE_URL, {
      query:{
        userId: authUser._id
      }
    });
    socket.connect();
    set({ socket: socket });


    socket.on("getOnlineUsers", (users)=>{
            set({onlineUsers: users});
    })


  },

  disConnectSocket: () => {
    if (get().socket?.connected) {
      get().socket?.disconnect();
    }
  },
}));