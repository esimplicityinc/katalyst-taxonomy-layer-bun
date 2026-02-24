import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { apiRoutes } from "../api";

const app = new Elysia().use(apiRoutes);

describe("API Routes", () => {
  it("GET /api/v1 returns welcome message", async () => {
    const response = await app.handle(new Request("http://localhost/api/v1"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe("Welcome to the API");
    expect(body.version).toBe("v1");
  });

  it("GET /api/v1/items returns empty list", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/v1/items")
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.items).toEqual([]);
    expect(body.total).toBe(0);
  });

  it("GET /api/v1/items/:id returns item", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/v1/items/test-123")
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.id).toBe("test-123");
    expect(body.name).toBe("Item test-123");
  });

  it("POST /api/v1/items creates item", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/v1/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Test Item" }),
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.id).toBeDefined();
    expect(body.name).toBe("Test Item");
    expect(body.createdAt).toBeDefined();
  });
});
