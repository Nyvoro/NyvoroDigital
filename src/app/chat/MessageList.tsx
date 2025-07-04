"use client";

import React, { forwardRef } from "react";
import MessageItem from "./MessageItem";
import { Message } from "./ChatWindow";

interface Props {
  messages: Message[];
}

const MessageList = forwardRef<HTMLUListElement, Props>(function MessageList(
  { messages },
  ref
) {
  return (
    <ul
      ref={ref}
      role="list"
      className="flex flex-1 flex-col overflow-y-auto"
    >
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} />
      ))}
    </ul>
  );
});

export default MessageList;

