import Fastify from "fastify";
import cors from "@fastify/cors";
import chatRoutes from "./routes/chat";
import "dotenv/config";

const fastify = Fastify({ logger: true });

async function start() {
  try {
    console.log("📦 Registering CORS...");
    await fastify.register(cors, { origin: true });
    console.log("✅ CORS registered.");

    fastify.register(chatRoutes);

    await fastify.listen({ port: 5001, host: "0.0.0.0" });
    console.log("🚀 Server ready at http://localhost:5001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
