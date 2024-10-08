import type { NextPage } from "next";
import { notFound } from "next/navigation";
import { client } from "#/lib/client";
import { MDXEditor } from "./_components/MDXEditor/MDXEditor";

type PageProps = {
  params: { id: string };
};

const Page: NextPage<PageProps> = async ({ params: { id } }) => {
  const res = await client.api.v1.documents[":id"].$get({
    param: { id },
  });
  if (!res.ok) return notFound();
  const data = await res.json();
  const document = data.data.document.content;

  return <MDXEditor md={document} />;
};

export default Page;
