"use client";

import React, { useReducer, useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import { ChatError } from "../lib/chatClient";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import ErrorBanner from "./ErrorBanner";
import {
  conversationReducer,
  initialState,
} from "./conversationReducer";
import type { Msg } from "@/types/chat";

export default function ChatWindow() {
  const { sendPrompt } = useChat();
  const [state, dispatch] = useReducer(conversationReducer, initialState);
  const listRef = useRef<HTMLUListElement>(null);
  const autoScroll = useRef(true);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => {
      const fromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (fromBottom > 80) autoScroll.current = false;
      if (fromBottom < 20) autoScroll.current = true;
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const fromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (autoScroll.current) {
      if (typeof el.scrollTo === "function") {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: fromBottom < 20 ? "smooth" : "auto",
        });
      } else {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [state.messages]);

  useEffect(() => {
    const handler = () => {
      const el = listRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

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
      setBanner("The agent is overloaded. Please try again later.");
    }
  };

  return (
    <div className="flex h-[calc(100svh-0rem)] flex-col items-center p-4">
      {banner && <ErrorBanner message={banner} onDismiss={() => setBanner(null)} />}
      <div className="flex w-full max-w-xl flex-1 flex-col">
        <MessageList ref={listRef} messages={state.messages} />
        <ChatInput
          onSend={handleSend}
          isLoading={Object.values(state.pending).some(Boolean)}
          onEscape={() => setBanner(null)}
        />
      </div>
    </div>
  );
}

export type Message = Msg;

