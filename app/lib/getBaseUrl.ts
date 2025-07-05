export const getBaseUrl = () => {
  if (typeof window === "undefined") {
    // Server-Side
    return process.env.MCP_API_URL ?? "http://127.0.0.1:5001";
  }

  // Client-Side (Browser in Codespaces)
  const port = 5001;
  const host = window.location.hostname; // z. B. shiny-...github.dev
  return "https://shiny-goggles-r4rw65ww9jqw3wqq4-5001.app.github.dev";
};
