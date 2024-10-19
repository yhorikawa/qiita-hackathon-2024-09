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

interface MessagesResponse {
  success: boolean;
  data: { messages: model.Messages };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();

const routes = app.get(
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
);

export default routes;
