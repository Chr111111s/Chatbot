const Chatmessage = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div
      className={`p-4 rounded-lg max-w-xl ${
        isUser ? "bg-yellow-100 self-end" : "bg-white self-start"
      }`}
    >
      {content}
    </div>
  );
};

export default Chatmessage;
