import { Elysia, t } from "elysia";

export const healthRoutes = new Elysia({ prefix: "/health" })
  .get(
    "/",
    () => ({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }),
    {
      detail: {
        summary: "Health check",
        tags: ["Health"],
      },
      response: t.Object({
        status: t.String(),
        timestamp: t.String(),
        uptime: t.Number(),
      }),
    }
  )
  .get(
    "/ready",
    () => ({
      ready: true,
      checks: {
        server: "ok",
      },
    }),
    {
      detail: {
        summary: "Readiness check",
        tags: ["Health"],
      },
      response: t.Object({
        ready: t.Boolean(),
        checks: t.Object({
          server: t.String(),
        }),
      }),
    }
  );
