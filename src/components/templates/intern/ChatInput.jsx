import { useState } from "react";
import inputImage from "/input.png"; 

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center max-w-2xl mx-auto w-full">
      <div className="relative flex-1">
        <input
          type="text"
          className="w-full p-3 pl-4 pr-10 rounded-full border border-gray-300 outline-none text-gray-700"
          placeholder="Pregunta"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <img src={inputImage} alt="Enviar" className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
 