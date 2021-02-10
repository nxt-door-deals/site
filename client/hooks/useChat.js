import { useState, useEffect, useRef } from "react";

const useChat = (senderId, chatId, WS_URL) => {
  const [messages, setMessages] = useState([]); // For sent and received messages
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(WS_URL);
    socketRef.current.id = senderId;
  }, []);

  useEffect(() => {
    socketRef.current.addEventListener("message", function (event) {
      const inComingMessage = {
        data: JSON.parse(event.data),
        ownedBySender: JSON.parse(event.data).sender === socketRef.current.id,
      };

      setMessages((messages) => [...messages, inComingMessage]);
    });
  }, [chatId]);

  const sendMessage = (messageData) => {
    socketRef.current.send(
      JSON.stringify({
        data: messageData,
        sender: socketRef.current.id,
      })
    );
  };

  return { messages, sendMessage };
};

export default useChat;
