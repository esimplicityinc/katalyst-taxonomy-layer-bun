import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { healthRoutes } from "./routes/health";
import { apiRoutes } from "./routes/api";
import { config } from "./config";

const app = new Elysia()
  .use(
    cors({
      origin: config.corsOrigins,
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "{{ layer_name }} API",
          version: "0.1.0",
          description: "{{ description }}",
        },
      },
    })
  )
  .use(healthRoutes)
  .use(apiRoutes)
  .listen(config.port);

console.log(
  `🦊 {{ layer_name }} is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
