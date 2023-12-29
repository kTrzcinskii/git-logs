import axios, { type AxiosResponse } from "axios";
import { backendUrl } from "~/constants";

const url = `${backendUrl}/gitrepo/logs`;

export const getRepositoryLogs = async (id: string | number, token: string) => {
  const response: AxiosResponse<
    Array<{
      commitId: string;
      authorName: string;
      authorEmail: string;
      createdAt: string;
      content: string;
    }>
  > = await axios.get(`${url}?gitRepoId=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
