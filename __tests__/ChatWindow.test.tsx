import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

vi.mock("../src/app/hooks/useChat", () => {
  const send = vi.fn().mockResolvedValue({ id: "2", content: "Hi" });
  return {
    useChat: () => ({ sendPrompt: send, isLoading: false }),
    __esModule: true,
  };
});

import ChatWindow from "../src/app/chat/ChatWindow";

describe("ChatWindow", () => {
  it("shows user and bot messages", async () => {
    render(<ChatWindow />);

    const textarea = screen.getByLabelText(/prompt/i);
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, { key: "Enter" });

    await screen.findByText("Hello");
    await screen.findByText("Hi");
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });
  });
});

