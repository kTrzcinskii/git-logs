import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllGitRepositories } from "~/api/getAllRepositories";
import { useGetJwtToken } from "../useGetJwtToken";

export interface GetAllRepositoriesResponse {
  content: Array<{ id: number; name: string; repositoryUrl: string }>;
  last: boolean;
  first: boolean;
  empty: boolean;
}

export const useGetAllRepositories = (page: number) => {
  const token = useGetJwtToken();
  const query = useQuery({
    queryKey: ["repositories", page],
    queryFn: async () => await getAllGitRepositories(page, token),
    placeholderData: keepPreviousData,
  });
  return query;
};
