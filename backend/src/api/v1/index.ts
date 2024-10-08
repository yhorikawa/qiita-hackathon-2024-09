import type { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import conversationsApi from "./conversations";
import documentsApi from "./documents";

export type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
};

const api = new Hono<{ Bindings: Bindings }>()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/conversations", conversationsApi)
  .route("/documents", documentsApi);

export default api;
