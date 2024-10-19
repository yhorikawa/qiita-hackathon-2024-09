import type { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import { fetchChatGPTResponse } from "../../util/openai/openai";
import authApi from "./auth";
import questionsApi from "./questions";
import roomsApi from "./rooms";
import usersApi from "./users";

export type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
  JWT_SECRET: string;
  OPENAI_API_KEY: string;
  ENVIROMENT: string;
};

const api = new Hono<{ Bindings: Bindings }>()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/auth", authApi)
  .route("/questions", questionsApi)
  .route("/rooms", roomsApi)
  .route("users", usersApi)
  .get("/test", async (c) => {
    const response = await fetchChatGPTResponse(
      c.env.OPENAI_API_KEY,
      [
        {
          role: "system",
          content: `以下の自由記述形式の質問に対するユーザーの回答をもとに、ビッグファイブ性格特性（開放性、誠実性、外向性、協調性、神経症傾向）を0から100の範囲で算出してください。また、ユーザーに似た守護霊のプロフィールを生成し、JSON形式で出力します。JSONは以下のサンプル形式に従ってください。{"big5_scores":{"openness":"integer value (0-100)","conscientiousness":"integer value (0-100)","extraversion":"integer value (0-100)","agreeableness":"integer value (0-100)","neuroticism":"integer value (0-100)"},"profile":{"description":"string (approximately 200 characters describing the person in Japanese)","description_en":"string (approximately 200 characters describing the person in English)"}}`,
        },
        {
          role: "user",
          content: `

          外向性（Extraversion）に関する質問:



          質問: 最近体験した楽しかった出来事や人との交流について教えてください。どのように感じましたか？

          回答: 最近、友人との週末のキャンプに参加しました。新しい人々とも交流する機会が多く、非常に楽しかったです。自然の中でのアクティビティや夜の焚き火周りの会話は、私に多くのエネルギーをもたらしてくれました。人と交流することで、ポジティブな気分になり、心から楽しむことができました。




          調和性（Agreeableness）に関する質問:



          質問: 他人との意見の対立があったとき、あなたはどのように対処しますか？その経験について具体的に話してください。

          回答: 他人との意見の対立があったときは、まず相手の意見をよく聞くように心がけています。その上で自分の考えを丁寧に伝え、どのように折り合いをつけるかを模索します。先日は、仕事の進め方について意見が分かれましたが、時間をかけてお互いの立場を理解し、最終的には双方が納得できる方法を見つけました。




          誠実性（Conscientiousness）に関する質問:



          質問: 大きなプロジェクトやタスクをどのように計画して進めていきますか？その過程を教えてください。

          回答: 大きなプロジェクトを進めるときは、最初にゴールを明確にし、必要なタスクをリストアップします。その後、優先順位をつけてスケジュールを組み、進捗を管理します。最近のプロジェクトでは、定期的なミーティングでチームと進捗を共有し、問題があればすぐに対応策を考えるようにしました。




          神経症的傾向（Neuroticism）に関する質問:



          質問: 最近、ストレスを感じた状況について教えてください。それに対処するためにどのようなアプローチを取りましたか？

          回答: 最近、仕事の締め切りが重なりストレスを感じました。対処法として、タスクを細分化し、一つひとつ計画的に進めることを心がけました。また、休憩時間にはリラックスできる音楽を聴くことで気分転換を図り、ストレスを軽減しました。




          開放性（Openness）に関する質問:



          質問: 新しいアイデアや異文化についてどのように考えていますか？最近どのような新しい体験をしましたか？

          回答: 新しいアイデアや異文化については、常に興味を持っています。最近では、異文化料理のクラスに参加し、新しい調理法や食材について学ぶ機会を得ました。これにより、新しい視点を得ることができ、自分の料理の幅を広げることができました。
          `,
        },
      ],
      { response_format: { type: "json_object" } },
    );
    return c.json({ response });
  });

export default api;
