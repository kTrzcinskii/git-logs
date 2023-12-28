import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { register } from "~/api/register";
import { jwtCookieName } from "~/constants";

export interface RegisterVariables {
  username: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export const useRegister = (): UseMutationResult<
  RegisterResponse,
  unknown,
  RegisterVariables,
  unknown
> => {
  const cookies = useCookies();
  const mutation = useMutation<RegisterResponse, unknown, RegisterVariables>({
    mutationFn: async (variables: RegisterVariables) => {
      const data = await register(variables);
      console.info(data);
      return data;
    },
    onSuccess: (data) => {
      cookies.set(jwtCookieName, data.token);
      console.info("cookies set");
    },
  });
  return mutation;
};
