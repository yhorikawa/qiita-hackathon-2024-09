"use client";

import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { ChatBallon, Loading, MessageSend } from "#/components/ui";
import { useGetRooms } from "./use-get-rooms";
import { usePostMessage } from "./use-post-message";

type Props = {
  params: {
    id: string;
  };
};

const Page: NextPage<Props> = ({ params: { id } }) => {
  const { data, isLoading, error, mutate } = useGetRooms(id);
  const { handleAction, setId, setText, text } = usePostMessage(mutate);

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  if (isLoading)
    return (
      <div className="w-24 h-24 mx-auto mt-20">
        <Loading />
      </div>
    );
  if (!data?.success || error) return notFound();

  return (
    <div className="bg-gray-100">
      <Link
        href={`/rooms/${data.data.room.memberId}`}
        className="flex w-full h-12"
      >
        <span className="flex justify-center items-center ">
          <svg
            className="w-[24px] h-[24px] text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m14 8-4 4 4 4"
            />
          </svg>
        </span>

        <span className="flex-1 flex justify-center items-center font-bold">
          {data.data.room.memberName}
        </span>
      </Link>
      <div className="flex items-start gap-2.5">
        <div className="px-4 py-6 gap-y-4 flex flex-col">
          {data.data.messages.map(({ id, message, user, messageType }) => {
            const isMe = user?.id !== data.data.room.memberId;
            return (
              <div key={id} className="w-full flex gap-x-4">
                {!isMe ? (
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={user?.imageUrl || "/214x214.png"}
                    alt=""
                    width={32}
                    height={32}
                  />
                ) : null}
                <div className="flex flex-col gap-1 w-full max-w-[320px]">
                  <div
                    className={twMerge([
                      "flex items-center flex-row-reverse space-x-2 rtl:space-x-reverse",
                      isMe ? "flex-row-reverse" : "flex-row",
                    ])}
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {isMe ? "あなた" : user?.name}
                      {!isMe && "さん"}
                      {messageType === "autoAi" ? "の守護霊" : ""}
                    </span>
                  </div>
                  <ChatBallon
                    message={message}
                    position={!isMe ? "left" : "right"}
                    isAi={messageType === "autoAi"}
                  />
                </div>
                {!isMe ? null : (
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={user?.imageUrl || "/214x214.png"}
                    alt=""
                    width={32}
                    height={32}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <MessageSend onClick={handleAction} text={text} setText={setText} />
    </div>
  );
};

export default Page;
