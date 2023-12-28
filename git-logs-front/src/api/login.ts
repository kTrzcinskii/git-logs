import axios, { type AxiosResponse } from "axios";
import { backendUrl } from "~/constants";
import {
  type LoginResponse,
  type LoginVariables,
} from "~/hooks/mutations/useLogin";

const url = `${backendUrl}/auth/login`;

export const login = async (vars: LoginVariables) => {
  const resposne: AxiosResponse<LoginResponse> = await axios.post(url, vars);
  return resposne.data;
};
