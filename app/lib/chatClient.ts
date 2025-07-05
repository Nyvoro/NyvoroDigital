import { ChatResponse } from "@/server/types";
import { getBaseUrl } from "./getBaseUrl";

console.log("🌐 BASE URL = ", getBaseUrl());
console.log("⬆️ Prompt wird gesendet an:", `${getBaseUrl()}/api/mcp/chat`);
console.log("➡️ ChatClient: Fetch an:", `${getBaseUrl()}/api/mcp/chat`);

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
 

  if (!response.ok) {
    const message = await response.text();
    throw new ChatError(message, response.status);
  }

  return await response.json();
}
