import { format } from "date-fns";
import type { NextPage } from "next";
import Link from "next/link";
import { client } from "#/lib/client";

const Page: NextPage = async () => {
  const res = await client.api.v1.documents.$get();
  if (!res.ok) return null;

  const {
    data: { documents },
  } = await res.json();

  return (
    <div className="flex flex-col gap-4">
      {documents.map((document) => (
        <Link
          href={`/articles/${document.id}`}
          key={document.id}
          className="w-full bg-white font-bold block rounded-md py-3 px-4"
        >
          <h2 className="text-base">{document.content.substring(0, 15)}...</h2>
          <p className="text-xs opacity-60 mt-2">
            {format(document.createdAt, "yyyy/MM/dd")}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Page;
