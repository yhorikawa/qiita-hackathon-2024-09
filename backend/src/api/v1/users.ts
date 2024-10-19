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

interface UserResponse {
  success: boolean;
  data: { user: model.Users; pasonality: model.Personalities };
  error: string[];
}

interface UserMeResponse {
  success: boolean;
  data: { user: model.Users };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  const setJwt = await jwt({ secret: c.env.JWT_SECRET, cookie: "accessToken" });
  return setJwt(c, next);
});

const routes = app
  .get("/", async (c) => {
    const users = await db.getUsers(c.env.DB);
    // TODO: userに紐づくroomを取得する

    const response: UsersResponse = {
      success: true,
      data: { users: users.results },
      error: [],
    };
    c.status(200);
    return c.json(response);
  })

  .get("/me", async (c) => {
    const payload = c.get("jwtPayload");
    const id = payload.id;

    const response: UserMeResponse = {
      success: false,
      data: {
        user: {} as model.Users,
      },
      error: [],
    };

    const user = await db.getUserById(c.env.DB, { id });
    if (!user) {
      c.status(404);
      response.error.push(id);
      return c.json(response);
    }

    response.success = true;
    response.data.user = user;
    c.status(200);
    return c.json(response);
  })

  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");

      const response: UserResponse = {
        success: false,
        data: {
          user: {} as model.Users,
          pasonality: {} as model.Personalities,
        },
        error: [],
      };

      const user = await db.getUserById(c.env.DB, { id });
      if (!user) {
        c.status(404);
        response.error.push("User not found");
        return c.json(response);
      }

      const personality = await db.getPersonalityByUserId(c.env.DB, {
        userId: user.id,
      });
      if (!personality) {
        c.status(404);
        response.error.push("Parsonality not found");
        return c.json(response);
      }

      response.success = true;
      response.data.user = user;
      response.data.pasonality = personality;
      return c.json(response);
    },
  );

export default routes;
