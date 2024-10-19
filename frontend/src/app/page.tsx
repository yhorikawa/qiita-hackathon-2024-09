import type { NextPage } from "next";
import { ChatBallon } from "#/components/ui/ChatBalloon";
import { Card } from "#/components/ui/card";
import { client } from "#/lib/client";

const Page: NextPage = async () => {
  const api = await client.api.v1.$get();
  const message = api.text();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        マンホールは大体円形だっ! <br />
        API通信テスト{message}
      </Card>
      <ChatBallon message="Hello, World!" position="right" />
    </div>
  );
};

export default Page;
