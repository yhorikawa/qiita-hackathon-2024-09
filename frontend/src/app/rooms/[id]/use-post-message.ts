import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

type Message = {
  message: string;
};

const fetcher = async (
  _url: string,
  { arg }: { arg: { message: Message; id: string } },
) => {
  const res = await client.api.v1.rooms[":id"].messages.$post({
    param: { id: arg.id },
    json: arg.message,
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.ok;
};

export const usePostMessage = (updateMessage: () => void) => {
  const { trigger } = useSWRMutation("postRoomMessage", fetcher, {
    onSuccess: () => updateMessage(),
  });

  const handleAction = useCallback(
    async (message: Message, id: string) => {
      try {
        await trigger({ message: message, id: id });
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
      }
    },
    [trigger],
  );

  return {
    handleAction,
  };
};
