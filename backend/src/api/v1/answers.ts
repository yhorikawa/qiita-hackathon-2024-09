import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";
import type * as model from "../../gen/sqlc/models";
import * as db from "../../gen/sqlc/querier";
import type { Bindings } from "./index";

interface QuestionResponse {
  success: boolean;
  data: { question: model.Questions };
  error: string[];
}

interface QuestionsResponse {
  success: boolean;
  data: { questions: model.Questions[] };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  const setJwt = await jwt({ secret: c.env.JWT_SECRET, cookie: "accessToken" });
  return setJwt(c, next);
});

const routes = app.get(
  "/",
  zValidator(
    "json",
    z.array(
      z.object({
        uuid: z.string(),
        answer: z.string(),
      }),
    ),
  ),
  async (c) => {
    const payload = c.get("jwtPayload");
    const userId = payload.id;
    const answers = c.req.valid("json");

    for (const answer of answers) {
      await db.createAnswer(c.env.DB, {
        id: crypto.randomUUID(),
        userId,
        questionId: answer.uuid,
        answer: answer.answer,
      });
    }
    c.status(201);
    return c.json({ success: true, error: [] });
  },
);

export default routes;
