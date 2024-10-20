import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { z } from "zod";
import type * as model from "../../gen/sqlc/models";
import * as db from "../../gen/sqlc/querier";
import { fetchChatResponse } from "../../util/openai";
import type { Bindings } from "./index";

interface MessageWithOptionalUser {
  user: model.Users | null;
  id: string;
  roomId: string;
  userId: string;
  message: string;
  messageType: string;
  createdAt: string;
  updatedAt: string;
}

interface RoomsWithMember {
  id: string;
  name: string;
  ownerId: string;
  memberId: string | null;
  memberName: string | null;
  createdAt: string;
  updatedAt: string;
}

interface RoomResponse {
  success: boolean;
  data: { room: RoomsWithMember; messages: MessageWithOptionalUser[] };
  error: string[];
}

interface MessageResponse {
  success: boolean;
  data: { message: model.Messages };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  const setJwt = await jwt({ secret: c.env.JWT_SECRET, cookie: "accessToken" });
  return setJwt(c, next);
});

const routes = app
  .get(
    "/redirect-room/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const payload = c.get("jwtPayload");
      const userId = payload.id;
      const { id } = await c.req.valid("param");

      const room = await db.getRoomByOwnerIdAndMemberId(c.env.DB, {
        ownerId: userId,
        memberId: id,
      });
      if (!room) {
        const uuid = crypto.randomUUID();
        await db.createRoom(c.env.DB, {
          id: uuid,
          name: "Chat Room",
          ownerId: userId,
          memberId: id,
        });

        const room = await db.getRoomById(c.env.DB, { id: uuid });
        if (!room) {
          c.status(404);
          return c.text("Room not found");
        }

        const personality = await db.getPersonalityByUserId(c.env.DB, {
          userId: userId,
        });

        const messages = [
          { role: "system", content: autoChat },
          {
            role: "user",
            content: personality?.description ?? "こんにちは",
          },
        ];

        let currentContent = personality?.description ?? "こんにちは";

        for (let i = 0; i < 3; i++) {
          const chatGPTResponse = await fetchChatResponse(
            c.env.OPENAI_API_KEY,
            messages,
          );

          await db.createMessage(c.env.DB, {
            id: crypto.randomUUID(),
            roomId: room.id,
            userId: id,
            message: chatGPTResponse.choices[0].message.content,
            messageType: "autoAi",
          });

          currentContent = chatGPTResponse.choices[0].message.content;

          const message_response = [
            { role: "system", content: autoChat },
            {
              role: "user",
              content: currentContent,
            },
          ];

          const chatGPTMessageResponse = await fetchChatResponse(
            c.env.OPENAI_API_KEY,
            message_response,
          );

          await db.createMessage(c.env.DB, {
            id: crypto.randomUUID(),
            roomId: room.id,
            userId,
            message: chatGPTMessageResponse.choices[0].message.content,
            messageType: "autoAi",
          });

          messages[1].content =
            chatGPTMessageResponse.choices[0].message.content;
        }
        return c.redirect(`/rooms/${room.id}`);
      }

      return c.redirect(`/rooms/${room.id}`);
    },
  )

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
        data: { room: {} as RoomsWithMember, messages: [] },
        error: [],
      };

      const room = await db.getRoomById(c.env.DB, { id });
      if (!room) {
        c.status(404);
        response.error.push("Room not found");
        return c.json(response);
      }

      const member = await db.getUserById(c.env.DB, {
        id: room.memberId ?? "",
      });

      const roomWithMember: RoomsWithMember = {
        id: room.id,
        name: room.name,
        ownerId: room.ownerId,
        memberId: room.memberId,
        memberName: member ? member.name : null,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      };

      const messages = await db.getMessagesByRoomId(c.env.DB, {
        roomId: room.id,
      });

      const results = await Promise.all(
        messages.results.map(async (message) => {
          const user = await db.getUserById(c.env.DB, { id: message.userId });

          return {
            ...message,
            user,
          };
        }),
      );

      response.success = true;
      response.data.room = roomWithMember;
      response.data.messages = results;
      return c.json(response);
    },
  )

  .post(
    "/:id/messages",
    zValidator("json", z.object({ message: z.string() })),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");
      const { message } = await c.req.valid("json");

      const payload = c.get("jwtPayload");
      const userId = payload.id;

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
        userId: userId,
        message: message,
        messageType: "general",
      });

      response.success = true;
      return c.json(response);
    },
  );

export default routes;

const autoChat = `
  必ず日本語で答えてください。

  あなたは、相手と話す会話のプロです。
  相手との会話に対して、適切な会話をしてください。
  また、時には疑問を投げかけて、相手に寄り添ってください。
`;
