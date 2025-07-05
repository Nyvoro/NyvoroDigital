"use client";
import React, { useEffect, useState } from "react";

interface Props {
  message: string | null;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 5000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!visible || !message) return null;

  return (
    <div
      role="alert"
      className="fixed left-1/2 top-2 z-50 w-[calc(100%-1rem)] max-w-md -translate-x-1/2 transform rounded-md bg-red-600 px-4 py-2 text-white shadow-md transition-all motion-reduce:transition-none"
    >
      <div className="flex items-start justify-between gap-2">
        <span>{message}</span>
        <button
          aria-label="dismiss error"
          onClick={() => {
            setVisible(false);
            onDismiss();
          }}
          className="ml-2 rounded px-2 hover:bg-red-700 focus:outline-none focus:ring"
        >
          ×
        </button>
      </div>
    </div>
  );
}
