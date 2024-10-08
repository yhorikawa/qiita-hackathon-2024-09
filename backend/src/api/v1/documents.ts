import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type * as model from "../../gen/sqlc/models";
import * as db from "../../gen/sqlc/querier";
import type { Bindings } from "./index";

interface DocumentsResponse {
  success: boolean;
  data: { documents: model.Documents[] };
  error: string[];
}

interface DocumentResponse {
  success: boolean;
  data: { document: model.Documents };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();
const route = app
  .get("/", async (c) => {
    const documents = await db.getDocuments(c.env.DB);
    const response: DocumentsResponse = {
      success: true,
      data: { documents: documents.results },
      error: [],
    };
    c.status(200);
    return c.json(response);
  })

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

      const response: DocumentResponse = {
        success: false,
        data: { document: {} as model.Documents },
        error: [],
      };

      const document = await db.getDocumentById(c.env.DB, { id });
      if (!document) {
        c.status(404);
        response.error.push("Document not found");
        return c.json(response);
      }

      c.status(200);
      response.success = true;
      response.data.document = document;
      return c.json(response);
    },
  );

export default route;
