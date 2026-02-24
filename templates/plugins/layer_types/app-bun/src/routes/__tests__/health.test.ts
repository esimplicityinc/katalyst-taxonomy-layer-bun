import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { healthRoutes } from "../health";

const app = new Elysia().use(healthRoutes);

describe("Health Routes", () => {
  it("GET /health returns ok status", async () => {
    const response = await app.handle(new Request("http://localhost/health"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.timestamp).toBeDefined();
    expect(body.uptime).toBeGreaterThanOrEqual(0);
  });

  it("GET /health/ready returns ready status", async () => {
    const response = await app.handle(
      new Request("http://localhost/health/ready")
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ready).toBe(true);
    expect(body.checks.server).toBe("ok");
  });
});
