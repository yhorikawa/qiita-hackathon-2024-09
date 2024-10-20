import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

const fetcher = async (
  _url: string,
  { arg }: { arg: { message: string; id: string } },
) => {
  const res = await client.api.v1.rooms[":id"].messages.$post({
    param: { id: arg.id },
    json: { message: arg.message },
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.ok;
};

export const usePostMessage = (updateMessage: () => void) => {
  const { trigger } = useSWRMutation("postRoomMessage", fetcher, {
    onSuccess: () => updateMessage(),
  });

  const [text, setText] = useState<string>("");
  const [id, setId] = useState<string>("");
  const handleAction = useCallback(async () => {
    try {
      await trigger({ message: text, id: id });
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
    }
  }, [trigger, text, id]);

  return {
    setText,
    setId,
    text,
    handleAction,
  };
};
