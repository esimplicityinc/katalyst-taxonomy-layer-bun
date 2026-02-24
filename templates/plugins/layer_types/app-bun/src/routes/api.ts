import { Elysia, t } from "elysia";

export const apiRoutes = new Elysia({ prefix: "/api/v1" })
  .get(
    "/",
    () => ({
      message: "Welcome to the API",
      version: "v1",
    }),
    {
      detail: {
        summary: "API root",
        tags: ["API"],
      },
    }
  )
  .get(
    "/items",
    () => ({
      items: [],
      total: 0,
    }),
    {
      detail: {
        summary: "List items",
        tags: ["Items"],
      },
      response: t.Object({
        items: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            createdAt: t.String(),
          })
        ),
        total: t.Number(),
      }),
    }
  )
  .get(
    "/items/:id",
    ({ params: { id } }) => ({
      id,
      name: `Item ${id}`,
      createdAt: new Date().toISOString(),
    }),
    {
      detail: {
        summary: "Get item by ID",
        tags: ["Items"],
      },
      params: t.Object({
        id: t.String(),
      }),
      response: t.Object({
        id: t.String(),
        name: t.String(),
        createdAt: t.String(),
      }),
    }
  )
  .post(
    "/items",
    ({ body }) => ({
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
    }),
    {
      detail: {
        summary: "Create item",
        tags: ["Items"],
      },
      body: t.Object({
        name: t.String({ minLength: 1 }),
      }),
      response: t.Object({
        id: t.String(),
        name: t.String(),
        createdAt: t.String(),
      }),
    }
  );
