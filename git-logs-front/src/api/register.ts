import axios, { type AxiosResponse } from "axios";
import { backendUrl } from "~/constants";
import {
  type RegisterResponse,
  type RegisterVariables,
} from "~/hooks/mutations/useRegister";

const url = `${backendUrl}/auth/register`;

export const register = async (vars: RegisterVariables) => {
  const resposne: AxiosResponse<RegisterResponse> = await axios.post(url, vars);
  return resposne.data;
};
