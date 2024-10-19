import type { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import authApi from "./auth";
import questionsApi from "./questions";
import roomsApi from "./rooms";

export type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
  JWT_SECRET: string;
  OPENAI_API_KEY: string;
  ENVIROMENT: string;
};

const api = new Hono<{ Bindings: Bindings }>()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/auth", authApi)
  .route("/questions", questionsApi)
  .route("/rooms", roomsApi);

export default api;
