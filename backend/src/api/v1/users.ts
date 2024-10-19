import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";
import type * as model from "../../gen/sqlc/models";
import * as db from "../../gen/sqlc/querier";
import type { Bindings } from "./index";

interface UsersResponse {
  success: boolean;
  data: { users: model.Users[] };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();

const routes = app.get("/", async (c) => {
  const users = await db.getUsers(c.env.DB);

  const response: UsersResponse = {
    success: true,
    data: { users: users.results },
    error: [],
  };
  c.status(200);
  return c.json(response);
});

export default routes;
