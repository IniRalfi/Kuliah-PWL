import { serve } from "bun";
import { increment, getCounter } from "./counter";

serve({
  port: 3000,
  fetch() {
    increment();
    return new Response(`counter ${getCounter()}`);
  },
});

console.log("server run at: http://localhost:3000");
