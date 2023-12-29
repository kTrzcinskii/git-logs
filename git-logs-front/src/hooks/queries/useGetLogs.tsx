import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useGetJwtToken } from "../useGetJwtToken";
import { getRepositoryLogs } from "~/api/getRepositoryLogs";

export const useGetLogs = (id: number | string) => {
  const token = useGetJwtToken();
  const query = useQuery({
    queryKey: ["logs", id],
    queryFn: async () => await getRepositoryLogs(id, token),
    placeholderData: keepPreviousData,
  });
  return query;
};
