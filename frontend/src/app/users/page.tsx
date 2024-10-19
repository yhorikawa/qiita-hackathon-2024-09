"use client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useGetUsers } from "./use-get-users";

const Page: NextPage = () => {
  const { data, isLoading, error } = useGetUsers();

  const handleClick = () => {};

  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  if (!data?.success || error) return notFound();

  return (
    <div className="m-4">
      <ul className="rounded-lg bg-white shadow-sm border border-solid border-gray-200">
        {data.data.users.map(({ imageUrl, id, name }) => (
          <li key={id}>
            <Link
              href={`/users/${id}`}
              className="w-full p-4 flex justify-between bg-white border-b border-b-solid border-b-gray-200 gap-x-2"
            >
              {imageUrl ? (
                <Image
                  className="w-6 h-6 rounded-full"
                  src={imageUrl}
                  alt={name}
                  width={20}
                  height={20}
                />
              ) : (
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  >
                    <title>svg</title>
                  </path>
                </svg>
              )}
              <span className="flex-1">{name}</span>
              <button type="button" onClick={handleClick}>
                <svg
                  className="text-gray-400 w-[24px] h-[24px] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
