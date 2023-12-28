import axios, { type AxiosResponse } from "axios";
import { backendUrl } from "~/constants";
import {
  type AddRepositoryResponse,
  type AddRepositoryVariables,
} from "~/hooks/mutations/useAddRepository";

const url = `${backendUrl}/gitrepo/create`;

export const addRepository = async (
  vars: AddRepositoryVariables,
  token: string,
) => {
  const response: AxiosResponse<AddRepositoryResponse> = await axios.post(
    url,
    vars,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
