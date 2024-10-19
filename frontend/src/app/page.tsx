"use client";
import type { NextPage } from "next";
import { useId } from "react";
import { useSignIn } from "#/app/_dependencies/use-sign-in";
import { Button, Input } from "#/components/ui";

const Page: NextPage = () => {
  const { name, setName, handleAction } = useSignIn();
  const inputId = useId();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="text-2xl font-extrabold tracking-tight leading-normal text-gray-900 dark:text-white">
          守護霊を通じて
          <br />
          思いがけない出会いを
        </h1>
        <div className="mt-12">
          <p className="text-base font-normal text-gray-400">
            「自分だけの守護霊」を作って、個性を映し出すもう一つの自分を見つけてみませんか？
          </p>
          <p className="mt-4 text-base font-normal text-gray-400">
            守護霊は、他の守護霊たちと自由に会話し、あなたが気づかない新しい出会いを探し続けます。
            守護霊同士の会話を通じて、あなたにピッタリの仲間や驚くような繋がりが見つかるかも？
          </p>
        </div>
        <div className="mt-12">
          <p className="text-lg font-extrabold leading-normal">
            5つの質問に答えるだけ！
            <br />
            未知のコミュニケーションを体験しよう
          </p>
          <Input
            className="mt-6 text-gray-400 bg-gray-700 border-gray-500 border-b-2 rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none"
            placeholder="ユーザー名を入力"
            id={inputId}
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
          />
          <button type="button" onClick={handleAction}>
            自分だけの守護霊を作る
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
