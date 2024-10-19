import type { NextPage } from "next";
import { Jumbotron } from "#/components/ui";
import { client } from "#/lib/client";

const Page: NextPage = async () => {
  const api = await client.api.v1.$get();
  const message = api.text();

  return <Jumbotron />;
};

export default Page;
