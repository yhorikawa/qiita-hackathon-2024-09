import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";
import type * as model from "../../gen/sqlc/models";
import * as db from "../../gen/sqlc/querier";
import type { Bindings } from "./index";

interface RoomResponse {
  success: boolean;
  data: { room: model.Rooms; messages: model.Messages[] };
  error: string[];
}

interface MessageResponse {
  success: boolean;
  data: { message: model.Messages };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();

const routes = app
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

      const response: RoomResponse = {
        success: false,
        data: { room: {} as model.Rooms, messages: [] },
        error: [],
      };

      const room = await db.getRoomById(c.env.DB, { id });
      if (!room) {
        c.status(404);
        response.error.push("Room not found");
        return c.json(response);
      }

      const messages = await db.getMessagesByRoomId(c.env.DB, {
        roomId: room.id,
      });

      response.success = true;
      response.data.room = room;
      response.data.messages = messages.results;
      return c.json(response);
    },
  )

  .post(
    "/:id/messages",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");

      const response: MessageResponse = {
        success: false,
        data: { message: {} as model.Messages },
        error: [],
      };

      const room = await db.getRoomById(c.env.DB, { id });
      if (!room) {
        c.status(404);
        response.error.push("Room not found");
        return c.json(response);
      }

      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
        roomId: room.id,
        userId: "ba6d5b49-f786-478f-aaf9-b7948b83a05e", // ちゃんと取得する
        message: "Hello, World!", // ちゃんと取得する
        messageType: "text", // ちゃんと取得する
      });

      response.success = true;
      return c.json(response);
    },
  );

export default routes;
