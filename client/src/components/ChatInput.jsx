import { useState, useRef } from "react";
import { Paperclip, SendHorizontal, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

function ChatInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  function handleImageChange(e) {
    const file = e.target.files?.[0];
     
    if(!file.type.startsWith("image")){ 
      return toast.error("Please select an image file");
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  function removeImage() {
    setImagePreview(null);
  }

  async function handleSendMessage(e) {
      e.preventDefault();
      if(!text.trim() && !imagePreview){
        return;
      }

     try {
         await sendMessage({
          text: text.trim(),
          image: imagePreview});

          setText("");
          setImagePreview(null);
          if(fileInputRef.current){
            fileInputRef.current.value = null;
          }
     } catch (error) {
      console.log("error");
      
      console.log(error);
      
        // toast.error(error.response.data.message);
     }

  }



  return (
    <>
      <form
        className="p-2 md:p-4 w-full flex justify-between flex-row"
        onSubmit={handleSendMessage}
      >
        <div className="flex justify-between items-center gap-2 w-full">
          <button
            type="button"
            className="p-2 rounded-full bg-[#0B0B0B] text-white hover:bg-[#1E1E1E]"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </button>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-4 rounded-full flex-grow bg-[#0B0B0B] text-white focus:outline-none resize-none min-h-[60px] max-h-[120px] text-sm md:text-base"
            placeholder="Type a message..."
            rows={1}
          />
          <button
          onClick={handleSendMessage}
            type="submit"
            className="px-4 py-2 h-[2.5rem] rounded-full bg-white text-black hover:bg-[#c3c3c3] focus:outline-none text-sm md:text-base"
          >
            <SendHorizontal />
          </button>
        </div>
      </form>
      {imagePreview && (
        <div className="relative inline-block">
          <img
            src={imagePreview || "/placeholder.svg"}
            alt="Selected file preview"
            className="max-w-[6rem] h-auto"
          />
          <button
            type="button"
            className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
            onClick={removeImage}
          >
            <X size={16} />
          </button>
        </div>
      )}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </>
  );
}

export default ChatInput;