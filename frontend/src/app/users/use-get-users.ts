import useSWR from "swr";
import { client } from "#/lib/client";

const fetcher = async () => {
  const res = await client.api.v1.users.$get();
  if (!res.ok) throw new Error(String(res.status));
  return await res.json();
};

export const useGetUsers = () => {
  const swr = useSWR(["/api/v1/users/"], () => fetcher());
  return swr;
};
