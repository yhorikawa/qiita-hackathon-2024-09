import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

type Answer = {
  uuid: string;
  answer: string;
};

const fetcher = async (
  _url: string,
  { arg }: { arg: { answers: Answer[] } },
) => {
  const res = await client.api.v1.answers.$post({
    json: arg.answers,
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.ok;
};

export const usePostAnswers = () => {
  const router = useRouter();
  const onSuccess = useCallback(() => {
    router.push("/questions/completed");
  }, [router]);
  const { trigger } = useSWRMutation("postMessage", fetcher, {
    onSuccess,
  });

  const handleAction = useCallback(
    async (answers: Answer[]) => {
      try {
        await trigger({ answers: answers });
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
