"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { ChatError } from "../lib/chatClient";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

export default function ChatWindow() {
  const { sendPrompt, isLoading } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 20;
    if (nearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((m) => [...m, userMsg]);

    try {
      const res = await sendPrompt(text);
      setMessages((m) => [
        ...m,
        { id: res.id, role: "bot", content: res.content },
      ]);
    } catch (err) {
      const message = err instanceof ChatError ? err.message : "Error";
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "bot", content: message },
      ]);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center p-4">
      <div className="flex w-full max-w-xl flex-1 flex-col">
        <MessageList ref={listRef} messages={messages} />
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
}

