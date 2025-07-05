import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ChatWindow from "../app/chat/ChatWindow";

vi.mock("@/app/hooks/useChat", () => ({
  useChat: () => ({
    sendPrompt: vi.fn(async () => ({ id: "2", content: "Hi there" })),
    conversation: { id: "2", content: "Hi there" },
    isLoading: false,
    error: null,
  }),
}));

describe("ChatWindow", () => {
  it("shows user and bot messages", async () => {
    render(<ChatWindow />);

    await screen.findByText("Hi there"); // ✅ Bot-Antwort kommt
    await waitFor(() =>
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
    );
  });
});

