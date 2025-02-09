import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

function Chatbox() {
    const { messages } = useChatStore();
    const { authUser } = useAuthStore();
    const chatEndRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chatbox whenever messages change
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 relative w-[92%] overflow-y-auto p-2 md:p-4">
            {messages.map((message, index) => (
                <div
                    key={message._id || index} // Ensure unique key
                    className={`mb-2 md:mb-4 ${message.senderId === authUser._id ? "text-right" : "text-left"}`}
                >
                    {message.image ? (
                        <img
                            src={message.image}
                            alt="Message content"
                            className="inline-block max-w-xs md:max-w-md rounded-lg"
                        />
                    ) : (
                        <span
                            className={`inline-block p-2 rounded-lg text-sm md:text-base ${
                                message.senderId === authUser._id ? "bg-blue-500" : "bg-gray-700"
                            }`}
                        >
                            {message.text}
                        </span>
                    )}
                </div>
            ))}
            {/* Dummy div to ensure scrolling to the bottom */}
            <div ref={chatEndRef} />
        </div>
    );
}

export default Chatbox;