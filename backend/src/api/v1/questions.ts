import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
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

const routes = app
  .get("/", async (c) => {
    const questions = await db.getQuestions(c.env.DB);
    const response: QuestionsResponse = {
      success: true,
      data: { questions: questions.results },
      error: [],
    };
    return c.json(response);
  })
  .get(
    "/getOrderNum/:orderNum",
    zValidator(
      "param",
      z.object({
        orderNum: z
          .string()
          .transform((v) => Number.parseInt(v))
          .refine((v) => !Number.isNaN(v), { message: "not a number" }),
      }),
    ),
    async (c) => {
      const { orderNum } = await c.req.valid("param");
      const question = await db.getQuestionByOrderNum(c.env.DB, { orderNum });
      if (!question) {
        c.status(404);
        return c.json({
          success: false,
          data: { question: {} as model.Questions },
          error: ["Question not found"],
        });
      }
      return c.json({ success: true, data: { question } });
    },
  );

export default routes;
