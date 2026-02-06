import { serve } from "bun";
import index from "./index.html";

import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello from Elysia + Om 🚀").listen(3000);

console.log(`🦊 Elysia running at http://localhost:${app.server?.port}`);

app.get("/hello/:name", ({ params }) => {
  return {
    message: `Halo ${params.name}!`,
  };
});

app.post("/login", ({ body }) => {
  const { email, password } = body as {
    email: string;
    password: string;
  };

  return {
    success: true,
    email,
  };
});

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

// console.log(`🚀 Server running at ${server.url}`);
