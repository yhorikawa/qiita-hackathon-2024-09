import { hc } from "hono/client";
import type { AppType } from "../../../backend/src/index";

const ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

export const client = hc<AppType>(ENDPOINT);
