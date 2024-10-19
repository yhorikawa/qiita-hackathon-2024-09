import useSWR from "swr";
import { client } from "#/lib/client";

const fetcher = async (id: string) => {
  const res = await client.api.v1.rooms["redirect-room"].$get({
    json: { memberId: id },
  });
  if (!res.ok) throw new Error(String(res.status));
  return await res.json();
};

export const useGetUser = (id: string) => {
  const swr = useSWR(["/api/v1/room/redirect", id], ([, id]) => fetcher(id));
  return swr;
};
