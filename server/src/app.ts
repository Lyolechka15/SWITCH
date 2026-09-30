import cors from "@fastify/cors";
import Fastify from "fastify";

import type { ApiConfig } from "./config.js";

export function buildServer(config: ApiConfig) {
  const app = Fastify({ logger: true });
  const allowedOrigins = new Set(config.corsOrigins);

  app.register(cors, {
    origin(origin, callback) {
      // Requests without Origin (for example, a local health probe) do not need CORS.
      callback(null, origin === undefined || allowedOrigins.has(origin));
    },
  });

  app.get("/v1/health", async () => ({
    status: "ok",
    service: "switch-api",
  }));

  app.setNotFoundHandler((_request, reply) => {
    return reply.status(404).send({
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
      },
    });
  });

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : undefined;
    const message = error instanceof Error ? error.message : "Bad request";

    return reply.status(statusCode ?? 500).send({
      error: {
        code: statusCode && statusCode < 500 ? "BAD_REQUEST" : "INTERNAL_ERROR",
        message: statusCode && statusCode < 500 ? message : "Internal server error",
      },
    });
  });

  return app;
}
