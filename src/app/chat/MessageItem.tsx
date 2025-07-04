"use client";

import React from "react";
import { Message } from "./ChatWindow";

interface Props {
  message: Message;
}

export default function MessageItem({ message }: Props) {
  const isUser = message.role === "user";
  return (
    <li
      role="listitem"
      className={`my-1 flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`rounded-md px-3 py-2 text-sm ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {message.content}
      </div>
    </li>
  );
}

