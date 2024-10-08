import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type * as model from "../../gen/sqlc/models";
import * as db from "../../gen/sqlc/querier";
import { fetchChatGPTResponse } from "../../util/openai";
import type { Bindings } from "./index";

interface ConversationsResponse {
  success: boolean;
  data: { conversations: model.Conversations[] };
  error: string[];
}

interface ConversationResponse {
  success: boolean;
  data: { conversation: model.Conversations };
  error: string[];
}

interface MessagesResponse {
  success: boolean;
  data: { messages: model.Messages[]; conversation: model.Conversations };
  error: string[];
}

interface MessageResponse {
  success: boolean;
  data: { message: model.Messages };
  error: string[];
}

interface DocumentResponse {
  success: boolean;
  data: { document: model.Documents };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();
const route = app
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().uuid(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");

      const response: ConversationResponse = {
        success: false,
        data: { conversation: {} as model.Conversations },
        error: [],
      };

      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(404);
        response.error.push("Conversation not found");
        return c.json(response);
      }

      response.success = true;
      response.data.conversation = conversation;
      c.status(200);
      return c.json(response);
    },
  )

  .get(
    "/:id/messages",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");

      const response: MessagesResponse = {
        success: false,
        data: { messages: [], conversation: {} as model.Conversations },
        error: [],
      };

      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(404);
        response.error.push("Conversation not found");
        return c.json(response);
      }

      const messages = await db.getMessagesByConversationId(c.env.DB, {
        conversationId: conversation.id,
      });

      response.success = true;
      response.data.messages = messages.results;
      response.data.conversation = conversation;
      c.status(200);
      return c.json(response);
    },
  )

  .post(
    "/start",
    zValidator("json", z.object({ message: z.string() })),
    async (c) => {
      const { message } = await c.req.valid("json");

      const response: ConversationResponse = {
        success: false,
        data: { conversation: {} as model.Conversations },
        error: [],
      };

      const conversationId = crypto.randomUUID();
      await db.createConversation(c.env.DB, { id: conversationId });

      const conversation = await db.getConversationById(c.env.DB, {
        id: conversationId,
      });
      if (!conversation) {
        c.status(500);
        response.error.push("Failed to create conversation");
        return c.json(response);
      }

      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
        conversationId,
        sender: "user",
        message,
      });

      const messages = [
        { role: "system", content: systemStartChat },
        {
          role: "user",
          content: message,
        },
      ];
      const chatGPTResponse = await fetchChatGPTResponse(
        c.env.OPENAI_API_KEY,
        messages,
      );
      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
        conversationId,
        sender: "ai",
        message: chatGPTResponse.choices[0].message.content,
      });

      response.success = true;
      response.data.conversation = conversation;
      c.status(201);
      return c.json(response);
    },
  )

  .post(
    "/:id/ask",
    zValidator("json", z.object({ message: z.string() })),
    zValidator(
      "param",
      z.object({
        id: z.string().uuid(),
      }),
    ),
    async (c) => {
      const { message } = await c.req.valid("json");
      const { id } = await c.req.valid("param");

      const response: ConversationResponse = {
        success: false,
        data: { conversation: {} as model.Conversations },
        error: [],
      };

      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(404);
        response.error.push("Conversation not found");
        return c.json(response);
      }

      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
        conversationId: conversation.id,
        sender: "user",
        message,
      });

      const askCount = conversation.askCount + 1;
      await db.updateConversationAskCount(c.env.DB, {
        id: conversation.id,
        askCount,
      });
      if (askCount > 3) {
        response.success = true;
        response.data.conversation = conversation;
        c.status(201);
        return c.json(response);
      }

      const messages = await db.getMessagesByConversationId(c.env.DB, {
        conversationId: conversation.id,
      });
      const messagelist = messages.results
        .map((m) => {
          return m.message;
        })
        .join("\n");

      const gptRequestMessages = [
        { role: "system", content: systemAskChat },
        {
          role: "user",
          content: messagelist,
        },
      ];
      const chatGPTResponse = await fetchChatGPTResponse(
        c.env.OPENAI_API_KEY,
        gptRequestMessages,
      );

      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
        conversationId: conversation.id,
        sender: "ai",
        message: chatGPTResponse.choices[0].message.content,
      });

      response.success = true;
      response.data.conversation = conversation;
      c.status(201);
      return c.json(response);
    },
  )

  .post(
    "/:id/create-document",
    zValidator(
      "param",
      z.object({
        id: z.string().uuid(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");

      const response: DocumentResponse = {
        success: false,
        data: { document: {} as model.Documents },
        error: [],
      };

      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(404);
        response.error.push("Failed to create conversation");
        return c.json(response);
      }

      const messages = await db.getMessagesByConversationId(c.env.DB, {
        conversationId: conversation.id,
      });
      const messagelist = messages.results
        .map((m) => {
          return m.message;
        })
        .join("\n");

      const gptRequestMessages = [
        { role: "system", content: systemDocument },
        {
          role: "user",
          content: messagelist,
        },
      ];
      const chatGPTResponse = await fetchChatGPTResponse(
        c.env.OPENAI_API_KEY,
        gptRequestMessages,
      );

      const documentId = crypto.randomUUID();

      await db.createDocument(c.env.DB, {
        id: documentId,
        conversationId: conversation.id,
        content: chatGPTResponse.choices[0].message.content,
      });

      const document = await db.getDocumentById(c.env.DB, { id: documentId });
      if (!document) {
        c.status(500);
        response.error.push("Failed to create document");
        return c.json(response);
      }

      response.success = true;
      response.data.document = document;
      c.status(201);
      return c.json(response);
    },
  )

  .get(
    "/:id/redirect-document",
    zValidator(
      "param",
      z.object({
        id: z.string().uuid(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");

      const document = await db.getDocumentByConversationId(c.env.DB, {
        conversationId: id,
      });
      if (!document) {
        c.status(404);
        return c.text("Document not found");
      }

      return c.redirect(`/articles/${document.id}`);
    },
  );

export default route;
const systemStartChat = `
  必ず日本語で答えてください。

  あなたは、ドキュメントをまとめるプロです。
  現在ユーザーはドキュメントをまとめるために、骨組みを送ります。
  聞かれた内容を解釈して、気になる点を質問してください。

  回答するのは、質問文だけで良いです。
`;

const systemAskChat = `
  必ず日本語で答えてください。

  あなたは、ドキュメントをまとめるプロです。
  現在ユーザーはドキュメントをまとめるために、質問をしています。
  聞かれた内容を解釈して、気になる点を質問してください。

  回答するのは、質問文だけで良いです。
`;

const systemDocument = `
  必ず日本語で答えてください。

  あなたは、ドキュメントをまとめるプロです。
  聞かれた内容を解釈して、マークダウンでドキュメントを作成してください。
  ネットに公開するので、情報は慎重に。
  ドキュメントはmax_completion_tokens: 300で必ず収まる範囲で作成してください。
  あと、マークダウンは、コードブロックではなく、ただの文字列としてください。

  回答するのは、まとめたマークダウンのみで良いです。
`;
