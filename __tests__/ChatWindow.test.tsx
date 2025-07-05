import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ChatWindow from "../app/chat/ChatWindow";

Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  value: () => {},
  writable: true,
});

vi.mock("../app/hooks/useChat", () => ({
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

    const textarea = screen.getByLabelText(/prompt/i);
    fireEvent.change(textarea, { target: { value: "hello" } });
    fireEvent.keyDown(textarea, { key: "Enter" });

    await screen.findByText("Hi there");
    await waitFor(() =>
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
    );
  });
});

