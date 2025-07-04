import { ChatResponse } from "@/server/types";
import { getBaseUrl } from "./getBaseUrl";

export class ChatError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function postPrompt(prompt: string): Promise<ChatResponse> {
  const response = await fetch(`${getBaseUrl()}/api/mcp/chat`, {
    method: "POST",
    
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  console.log("➡️ ChatClient: Fetch an:", `${getBaseUrl()}/api/mcp/chat`);

  if (!response.ok) {
    const message = await response.text();
    throw new ChatError(message, response.status);
  }

  return await response.json();
}
