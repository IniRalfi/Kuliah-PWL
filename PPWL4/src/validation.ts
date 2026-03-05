import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())
  .post(
    "/request",
    ({ body }) => {
      return {
        message: "Success",
        data: body,
      };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" }),
        age: t.Number({ minimum: 18 }),
      }),
    },
  )
  // Query dan Params
  .get("/id/:id", () => "Hello World!", {
    query: t.Object({
      name: t.String(),
    }),
    params: t.Object({
      id: t.Number(),
    }),
  })
  // Contoh Params
  .get("/user/:id", ({ params }) => params, {
    params: t.Object({
      id: t.Number(),
    }),
  })
  // Contoh Query
  .get("/search", ({ query }) => query, {
    query: t.Object({
      keyword: t.String(),
      page: t.Optional(t.Number()),
    }),
  })

  // PRAKTIKUM 2 - VALIDASI PARAMS & QUERY
  .get("/products/:id", ({ query, params }) => ({ query, params }), {
    params: t.Object({
      id: t.Number(),
    }),
    query: t.Object({
      sort: t.Union([t.Literal("asc"), t.Literal("desc")]),
    }),
  })

  // Validasi Response
  .get(
    "/ping",
    () => {
      return {
        success: true,
        message: "Server OK",
      };
    },
    {
      response: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
    },
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
