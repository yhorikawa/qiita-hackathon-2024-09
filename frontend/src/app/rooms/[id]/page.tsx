"use client";

import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { ChatBallon, Loading } from "#/components/ui";
import { useGetRooms } from "./use-get-rooms";

type Props = {
  params: {
    id: string;
  };
};

const Page: NextPage<Props> = ({ params: { id } }) => {
  const { data, isLoading, error } = useGetRooms(id);

  if (isLoading)
    return (
      <div className="flex flex-col gap-6">
        <p>Loading...</p>
        <Loading />
      </div>
    );
  if (!data?.success || error) return notFound();

  return (
    <div>
      <Link href={`/rooms/${id}`} className="flex w-full h-12">
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
          田中 しろー
        </span>
      </Link>
      <div className="flex items-start gap-2.5">
        {data.data.messages.map(({ id, message }) => (
          <Fragment key={id}>
            <Image className="w-8 h-8 rounded-full" src="" alt="" />
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 ">
                  Bonnie Green
                </span>
              </div>
              <ChatBallon message={message} position="right" />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Page;
