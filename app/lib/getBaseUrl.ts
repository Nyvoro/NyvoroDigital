export const getBaseUrl = () => {
  if (typeof window === "undefined") {
    // Server-Side
    return process.env.MCP_API_URL ?? "http://127.0.0.1:5001";
  }

  // Client-Side (Browser in Codespaces)
  const port = 5001;
  const host = window.location.hostname; // z. B. shiny-...github.dev
  return "https://effective-system-g456rv66g4w63p6vg-5001.app.github.dev";
};
