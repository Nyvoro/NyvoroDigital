"use client";

import React, { useReducer, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { ChatError } from "../lib/chatClient";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import {
  conversationReducer,
  initialState,
} from "./conversationReducer";
import type { Msg } from "@/types/chat";

export default function ChatWindow() {
  const { sendPrompt } = useChat();
  const [state, dispatch] = useReducer(conversationReducer, initialState);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 20;
    if (nearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [state.messages]);

  const handleSend = async (text: string) => {
    const userId = crypto.randomUUID();
    dispatch({ type: "ADD_USER", id: userId, content: text });
    dispatch({ type: "ADD_BOT_PLACEHOLDER", userId });

    try {
      const res = await sendPrompt(text);
      dispatch({ type: "RESOLVE_BOT", userId, content: res.content });
    } catch (err) {
      const message = err instanceof ChatError ? err.message : "Error";
      dispatch({ type: "REPLACE_WITH_ERROR", userId, content: message });
    }
  };

  return (
    <div className="flex h-screen flex-col items-center p-4">
      <div className="flex w-full max-w-xl flex-1 flex-col">
        <MessageList ref={listRef} messages={state.messages} />
        <ChatInput
          onSend={handleSend}
          isLoading={Object.values(state.pending).some(Boolean)}
        />
      </div>
    </div>
  );
}

export type Message = Msg;

