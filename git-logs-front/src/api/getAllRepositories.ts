import axios, { type AxiosResponse } from "axios";
import { backendUrl } from "~/constants";
import { type GetAllRepositoriesResponse } from "~/hooks/queries/useGetAllRepositories";

const url = `${backendUrl}/gitrepo`;

export const getAllGitRepositories = async (page: number, token: string) => {
  const response: AxiosResponse<GetAllRepositoriesResponse> = await axios.get(
    `${url}?page=${page}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
