import { postPrompt } from "./src/app/lib/chatClient";

(async () => {
  console.log("🟡 Sende Prompt an Chat-Endpoint...");

  try {
    const res = await postPrompt("Hallo von Robbe 🧪");
    console.log("✅ Antwort vom Server:", res);
  } catch (err) {
    console.error("❌ Fehler beim Prompt:", err);
  }
})();
