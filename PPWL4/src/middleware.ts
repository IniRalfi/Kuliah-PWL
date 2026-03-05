// Middleware.ts
import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia().use(openapi());
// Global Logger
app.onRequest(({ request }) => {
  console.log("📥", request.method, request.url);
  console.log("🕒", new Date().toISOString());
});

app.get("/", () => "Hello Middleware");

// Short Sirquit
app.onRequest(({ request, set }) => {
  if (request.headers.get("x-block") === "true") {
    set.status = 403;
    return { message: "Blocked" };
  }
});

// Before Handler
app.get(
  "/dashboard",
  () => ({
    message: "Welcome to Dashboard",
  }),
  {
    beforeHandle({ headers, set }) {
      if (!headers.authorization) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
        };
      }
    },
  },
);

// PRAKTIKUM 5 - beforeHandle
app.get(
  "/admin",
  () => ({
    stats: 99,
  }),
  {
    beforeHandle({ headers, set }) {
      if (headers.authorization !== "Bearer 123") {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
        };
      }
    },
  },
);

// PRAKTIKUM 6 - afterHandler
// afterHandler
app.onAfterHandle(({ response }) => {
  return {
    success: true,
    message: "data tersedia",
    data: response,
  };
});

app.get("/product", () => ({
  id: 1,
  name: "Laptop",
}));

// PRAKTIKUM 7 - Custom Validation Error
app.post("/login", ({ body }) => body, {
  body: t.Object({
    email: t.String({ format: "email" }),
    password: t.String({ minLength: 8 }),
  }),
});

app.onError(({ code, error, set }) => {
  if (code === "VALIDATION") {
    set.status = 400;
    return {
      success: false,
      error: "Validation Error", // ← sesuaikan format
    };
  }
  if (code === "NOT_FOUND") {
    set.status = 404;
    return {
      message: "Route not found",
    };
  }
  set.status = 500;
  return {
    message: "Internal Server Error",
  };
});

app.listen(3000);
console.log("Server running at http://localhost:3000");
