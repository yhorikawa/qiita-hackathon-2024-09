import { zValidator } from "@hono/zod-validator";
import { type Context, Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";
import type * as model from "../../gen/sqlc/models";
import * as db from "../../gen/sqlc/querier";
import { fetchChatGPTResponse } from "../../util/openai";
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

const routes = app.post(
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
    const reqAnswers = c.req.valid("json");

    for (const answer of reqAnswers) {
      await db.createAnswer(c.env.DB, {
        id: crypto.randomUUID(),
        userId,
        questionId: answer.uuid,
        answer: answer.answer,
      });
    }
    const gptResponse = await fetchPersonalities(c, userId);
    const createPersonalityParams = {
      id: crypto.randomUUID(),
      userId,
      openness: gptResponse.big5_scores.openness,
      conscientiousness: gptResponse.big5_scores.conscientiousness,
      extraversion: gptResponse.big5_scores.extraversion,
      agreeableness: gptResponse.big5_scores.agreeableness,
      neuroticism: gptResponse.big5_scores.neuroticism,
      description: gptResponse.profile.description,
      descriptionEn: gptResponse.profile.description_en,
    };
    await db.createPersonality(c.env.DB, createPersonalityParams);

    c.status(201);
    return c.json({ success: true, error: [] });
  },
);

const fetchPersonalities = async (
  c: Context<{ Bindings: Bindings }>,
  userId: string,
) => {
  const questions = await db.getQuestions(c.env.DB);
  const answers = await db.getAnswersByUserId(c.env.DB, { userId });

  const response = await fetchChatGPTResponse(
    c.env.OPENAI_API_KEY,
    [
      {
        role: "user",
        content: `以下の自由記述形式の質問に対するユーザーの回答をもとに、ビッグファイブ性格特性（開放性、誠実性、外向性、協調性、神経症傾向）を0から100の範囲で算出してください。また、ユーザーに似たドッペルゲンガーのプロフィールを生成し、JSON形式で出力します。JSONは以下のサンプル形式に従ってください。{"big5_scores":{"openness":"integer value (0-100)","conscientiousness":"integer value (0-100)","extraversion":"integer value (0-100)","agreeableness":"integer value (0-100)","neuroticism":"integer value (0-100)"},"profile":{"description":"string (approximately 200 characters describing the person in Japanese)","description_en":"string (approximately 200 characters describing the person in English)"}}`,
      },
      ...answers.results.map((answer) => ({
        role: "user",
        content: `
          ${questions.results.find((question) => question.id === answer.questionId)?.question}
          ${answer.answer}
        `,
      })),
    ],
    {
      response_format: {
        type: "json_schema",
        json_schema: {
          strict: true,
          name: "big5_scores",
          schema: {
            type: "object",
            properties: {
              big5_scores: {
                type: "object",
                properties: {
                  openness: {
                    type: "number",
                  },
                  conscientiousness: {
                    type: "number",
                  },
                  extraversion: {
                    type: "number",
                  },
                  agreeableness: {
                    type: "number",
                  },
                  neuroticism: {
                    type: "number",
                  },
                },
                additionalProperties: false,
                required: [
                  "openness",
                  "conscientiousness",
                  "extraversion",
                  "agreeableness",
                  "neuroticism",
                ],
              },
              profile: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  description_en: {
                    type: "string",
                  },
                },
                additionalProperties: false,
                required: ["description", "description_en"],
              },
            },
            additionalProperties: false,
            required: ["big5_scores", "profile"],
          },
        },
      },
    },
  );

  console.log(response);
  const json = response.choices[0].message.content;

  const validate = z.object({
    big5_scores: z.object({
      openness: z.number(),
      conscientiousness: z.number(),
      extraversion: z.number(),
      agreeableness: z.number(),
      neuroticism: z.number(),
    }),
    profile: z.object({
      description: z.string(),
      description_en: z.string(),
    }),
  });

  return validate.parse(JSON.parse(json));
};

export default routes;
