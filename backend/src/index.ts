import { Hono } from "hono";
import api from "./api/v1";

const app = new Hono();
const routes = app.route("/api/v1", api);

export default app;
export type AppType = typeof routes;
