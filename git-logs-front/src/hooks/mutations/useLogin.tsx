import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { login } from "~/api/login";
import { jwtCookieName } from "~/constants";

export interface LoginVariables {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const useLogin = (): UseMutationResult<
  LoginResponse,
  unknown,
  LoginVariables,
  unknown
> => {
  const cookies = useCookies();
  const mutation = useMutation<LoginResponse, unknown, LoginVariables>({
    mutationFn: async (variables: LoginVariables) => {
      const data = await login(variables);
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
