import { z } from "zod";

const environmentSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65_535).default(3001),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173,https://lyolechka15.github.io")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    )
    .refine((origins) => origins.length > 0, "CORS_ORIGINS must contain at least one origin")
    .refine(
      (origins) => origins.every((origin) => URL.canParse(origin)),
      "CORS_ORIGINS must contain valid URLs",
    ),
});

export type ApiConfig = {
  port: number;
  nodeEnv: "development" | "test" | "production";
  corsOrigins: string[];
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ApiConfig {
  const result = environmentSchema.safeParse(env);

  if (!result.success) {
    const problems = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
    throw new Error(`Invalid API environment configuration: ${problems.join("; ")}`);
  }

  return {
    port: result.data.PORT,
    nodeEnv: result.data.NODE_ENV,
    corsOrigins: result.data.CORS_ORIGINS,
  };
}
