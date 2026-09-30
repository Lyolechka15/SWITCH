import { buildServer } from "./app.js";
import { loadConfig } from "./config.js";

async function start() {
  const config = loadConfig();
  const app = buildServer(config);

  try {
    await app.listen({ host: "0.0.0.0", port: config.port });
    app.log.info(
      { environment: config.nodeEnv, port: config.port },
      "SWITCH API started",
    );
  } catch (error) {
    app.log.error(error, "SWITCH API failed to start");
    process.exitCode = 1;
  }
}

void start();
