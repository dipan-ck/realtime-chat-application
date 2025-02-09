import React, { useEffect } from "react";
import WelcomeHome from "./WelcomeHome";
import { useChatStore } from "../store/useChatStore";
import ChatInput from "./ChatInput";
import Chatbox from "./Chatbox";

function ChatUi() {
  const { messages, isMessagesLoading, getMessages, selectedUser } = useChatStore();

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  return (
    <div className="flex flex-col items-center rounded-3xl w-full h-full bg-[#121212] text-white">
      {selectedUser ? (
        <>
          <div className="w-fit p-4 mt-2 rounded-full bg-[#0B0B0B] flex items-center">
            <img
              src={selectedUser.profilePic || "/05.png"}
              alt={selectedUser.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{selectedUser.name}</span>
              <p className={`${selectedUser.status ? "text-[#affe9f]" : "text-[#8a8a8a]"} text-xs`}>
                {selectedUser.status ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <Chatbox/>
         
        </>
      ) : (
        <div className="flex-1 relative w-[98%] overflow-y-auto p-2 md:p-4">
          <WelcomeHome />
        </div>
      )}
      <ChatInput />
    </div>
  );
}

export default ChatUi;