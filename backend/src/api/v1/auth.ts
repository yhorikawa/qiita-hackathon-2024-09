import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { z } from "zod";
import * as db from "../../gen/sqlc/querier";
import type { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();

const routes = app
  .post(
    "/register",
    zValidator(
      "json",
      z.object({
        name: z.string(),
      }),
    ),
    async (c) => {
      const { name } = await c.req.valid("json");
      const id = crypto.randomUUID();

      if (await db.getUser(c.env.DB, { name })) {
        c.status(409);
        return c.json({
          success: false,
          message: "User already exists",
        });
      }

      await db.createUsers(c.env.DB, { id, name });
      const accessToken = await sign({ id: id }, c.env.JWT_SECRET);
      setCookie(c, "accessToken", accessToken, {
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        httpOnly: true,
        sameSite: "Lax",
        secure: !(c.env.ENVIROMENT === "dev"),
      });
      c.status(201);
      return c.json({ success: true, id });
    },
  )

  .post(
    "/signin",
    zValidator(
      "json",
      z.object({
        name: z.string(),
      }),
    ),
    async (c) => {
      const { name } = await c.req.valid("json");

      const results = await db.getUser(c.env.DB, { name });
      if (!results) {
        c.status(401);
        return c.json({ message: "User does not exist" });
      }

      const accessToken = await sign({ id: results.id }, c.env.JWT_SECRET);
      setCookie(c, "accessToken", accessToken, {
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        httpOnly: true,
        sameSite: "Lax",
        secure: !(c.env.ENVIROMENT === "dev"),
      });
      return c.json({ success: true, id: results.id });
    },
  )
  .post("/signout", async (c) => {
    setCookie(c, "accessToken", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "Lax",
      secure: !(c.env.ENVIROMENT === "dev"),
    });
    return c.json({ success: true });
  });

export default routes;
