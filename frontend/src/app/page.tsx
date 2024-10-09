import type { NextPage } from "next";
import { client } from "#/lib/client";

const Page: NextPage = async () => {
  const api = await client.api.v1.$get();
  const message = api.text();

  return (
    <div className="flex flex-col gap-4">
      マンホールは大体円形だっ! <br />
      API通信テスト{message}
    </div>
  );
};

export default Page;
