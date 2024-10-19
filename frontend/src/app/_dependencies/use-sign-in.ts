import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

const fetcher = async (_url: string, { arg }: { arg: { name: string } }) => {
  const result = await client.api.v1.auth.register.$post({
    json: { name: arg.name },
  });
  const data = await result.json();
  if (Object.hasOwn(data, "message")) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    throw new Error((data as any).message);
  }
  return data;
};

class AlreadySignInError extends Error {
  constructor() {
    super();
    this.name = "AlreadySignInError";
  }
}

const signInFetcher = async (
  _url: string,
  { arg }: { arg: { name: string } },
) => {
  const result = await client.api.v1.auth.signin.$post({
    json: { name: arg.name },
  });
  const data = await result.json();
  if (Object.hasOwn(data, "message")) {
    if (result.status === 401) {
      throw new AlreadySignInError();
    }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    throw new Error((data as any).message);
  }
  return data;
};

export const useSignIn = () => {
  const { trigger: signInTrigger } = useSWRMutation(
    "/v1/api/auth/signin",
    signInFetcher,
  );
  const { trigger } = useSWRMutation("/v1/api/auth/register", fetcher);
  const [name, setName] = useState("");
  const action = useCallback(async () => {
    try {
      const isSignIn = await signInTrigger({ name });
      if (!isSignIn) return;
      window.location.href = "/mypage";
    } catch (error) {
      if (error instanceof AlreadySignInError) {
        const result = await trigger({ name });
        if (!result) return;
        window.location.href = "/questions/completed";
      }
    }
  }, [name, trigger, signInTrigger]);
  const handleAction = useCallback(() => action(), [action]);

  return {
    name,
    setName,
    handleAction,
  };
};
