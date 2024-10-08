import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

const fetcher = async (_url: string, { arg }: { arg: { content: string } }) => {
  const res = await client.api.v1.conversations.start.$post({
    json: {
      message: arg.content,
    },
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
};

export const usePostConversations = () => {
  const router = useRouter();
  const { trigger } = useSWRMutation("postConvasations", fetcher);

  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await trigger({ content: text });
      router.push(`/chat/${data.conversation.id}`);
    } catch (error) {
      console.error("Error:", error);
      throw new Error(String(error));
    } finally {
      setIsLoading(false);
    }
  }, [trigger, text, router]);

  return {
    text,
    setText,
    handleAction,
    isLoading,
  };
};
