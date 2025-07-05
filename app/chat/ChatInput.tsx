"use client";

import React, { useState } from "react";

interface Props {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="mt-2 flex gap-2">
      <textarea
        aria-label="Prompt"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        rows={1}
        className="flex-1 resize-none rounded-md border p-2 text-sm disabled:opacity-50"
        style={{ maxHeight: "6rem" }}
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="rounded-md bg-blue-600 px-3 py-2 text-white disabled:opacity-50"
      >
        {isLoading ? (
          <span data-testid="spinner" className="animate-spin">⏳</span>
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
}
