import { useParams } from "next/navigation";
import useSWR from "swr";
import { client } from "#/lib/client";

const fetcher = async (id: string) => {
  const res = await client.api.v1.conversations[":id"].messages.$get({
    param: { id },
  });
  if (!res.ok) throw new Error(String(res.status));
  return await res.json();
};

export const useGetConversationsList = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const swr = useSWR(["/api/v1/documents/:id", id], ([, id]) => fetcher(id));
  return swr;
};
