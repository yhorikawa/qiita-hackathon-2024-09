"use client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import Lottie from "react-lottie";
import { twMerge } from "tailwind-merge";
import { Button, Loading } from "#/components/ui";
import { useGetMe } from "../../_dependencies/use-get-me";
import AnianimationData from "./completed-animaton.json";

const Page: NextPage = () => {
  const { data, isLoading, error } = useGetMe();
  const [isShowImage, setIsShowImage] = useState(false);

  if (isLoading)
    return (
      <div className="h-dvh flex items-center">
        <div className="py-6 px-4 flex-grow">
          <p className="text-lg leading-normal font-black text-center">
            診断内容から
            <br />
            あなたの守護霊を作成中...
          </p>
          <div className="mt-6 flex justify-center">
            <Loading />
          </div>
        </div>
      </div>
    );

  if (!data?.success || error) return notFound();

  const handleClick = () => {
    setIsShowImage(true);
  };

  const defaultOptions = {
    autoplay: true,
    animationData: AnianimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="h-dvh flex items-center">
        <div className="flex flex-col items-center flex-grow">
          <p className="text-lg leading-normal font-black text-center">
            あなたの守護霊が作成されました！
          </p>
          <div className="mt-6">
            {isShowImage ? (
              <Image
                src={data.data.user.imageUrl || "/214x214.png"}
                alt="守護霊"
                width={214}
                height={214}
                className="rounded-full object-cover"
              />
            ) : (
              <Lottie options={defaultOptions} height={100} width={100} />
            )}
          </div>
          <div className={!isShowImage ? "" : "hidden"}>
            <Button type="button" onClick={handleClick}>
              守護霊を見る
            </Button>
          </div>
          <Link
            href="/mypage"
            className={twMerge(
              "flex gap-2 items-center mt-6 py-3 px-5 font-medium rounded-lg bg-blue-700 hover:bg-blue-800 text-white",
              !isShowImage && "hidden",
            )}
          >
            マイページで診断結果を見る
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
