export const config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || "0.0.0.0",
  environment: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
  corsOrigins: process.env.CORS_ORIGINS?.split(",") || ["*"],
} as const;

export type Config = typeof config;
