import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

const fetcher = async (
  _url: string,
  { arg }: { arg: { content: string; id: string } },
) => {
  const res = await client.api.v1.conversations[":id"].ask.$post({
    param: { id: arg.id },
    json: {
      message: arg.content,
    },
  });
  if (!res.ok) throw new Error(String(res.status));
  const data = await res.json();
  return data.data.conversation.askCount;
};

export const usePostChat = (updateChat: () => void) => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { trigger } = useSWRMutation("postChat", fetcher, {
    onSuccess: () => updateChat(),
  });

  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = useCallback(async () => {
    setIsLoading(true);
    try {
      const count = await trigger({ content: text, id });
      if (count === 3) {
        await client.api.v1.conversations[":id"]["create-document"].$post({
          param: { id },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setText("");
    }
  }, [trigger, text, id]);

  return {
    text,
    setText,
    handleAction,
    isLoading,
  };
};
