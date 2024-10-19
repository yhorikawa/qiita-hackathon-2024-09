import useSWR from "swr";
import { client } from "#/lib/client";

const fetcher = async (id: string) => {
  const res = await client.api.v1.rooms[":id"].$get({ param: { id } });
  if (!res.ok) throw new Error(String(res.status));
  return await res.json();
};

export const useGetRooms = (id: string) => {
  const swr = useSWR(["/api/v1/rooms/", id], ([, id]) => fetcher(id));
  return swr;
};
