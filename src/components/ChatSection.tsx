"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Socket } from "socket.io-client";
import { useAuthContext } from "@/context";
import axios from "axios";
interface Message {
  id: string;
  content: string;
  roomId: string;
  user: User;
}
interface User {
  id: string;
  name: string;
}

interface ChatProps {
  roomId: string;
  userId: string;
  socket: Socket | null;
}

const ChatSection = ({ roomId, userId, socket }: ChatProps) => {
  const { token } = useAuthContext()
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  // console.log("userid is", userId)
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: any) => {
      const newData: Message = {
        id: data.id,
        user: {
          id: data.user.id,
          name: data.user.name
        },
        content: data.content,
        roomId: data.roomId
      };
      setMessages((prevMessages) => [...prevMessages, newData]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [socket]);
  useEffect(() => {
    setDataLoaded(false)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setMessages(response.data)
      setDataLoaded(true)
    }).catch((error) => {
      console.error("Error fetching messages:", error);

    });
  }, [])
  // Send message function
  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    console.log("Sending message:", {
      roomId,
      userId, // Ensure this is correct
      content: input,
    });
    // Emit message to server
    socket.emit("send_message", { roomId, userId, content: input });

    setInput(""); // Clear input
  };

  return (
    <Card className="w-full h-screen p-5 shadow-lg bg-gray-900 border-gray-800">
      <CardContent className="h-full flex flex-col">
        {/* Chat Messages */}
        {
          !dataLoaded ? <p>Loading</p> : <ScrollArea ref={chatRef} className="flex-grow overflow-y-auto space-y-3 p-2 border border-gray-800 bg-gray-950">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-2 mt-5 max-w-[80%]">
                <Avatar>
                  {/* <AvatarImage src={msg.sender === "user" ? "/user-avatar.png" : "/bot-avatar.png"} /> */}
                  <AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">{msg.user.name}</span>
                  <p className="text-white">{msg.content}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        }


        {/* Input Section */}
        <div className="mt-auto flex items-center space-x-2 pt-4">
          <Input
            className="flex-1 bg-gray-800 text-white border-gray-700"
            placeholder="Chat..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
