import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { addRepository } from "~/api/addRepository";
import { useGetJwtToken } from "../useGetJwtToken";

export interface AddRepositoryVariables {
  name: string;
  url: string;
}

export interface AddRepositoryResponse {
  success: boolean;
}

export const useAddRepository = (): UseMutationResult<
  AddRepositoryResponse,
  unknown,
  AddRepositoryVariables,
  unknown
> => {
  const token = useGetJwtToken();
  const mutation = useMutation<
    AddRepositoryResponse,
    unknown,
    AddRepositoryVariables
  >({
    mutationFn: async (variables: AddRepositoryVariables) => {
      const data = await addRepository(variables, token);
      console.info(data);
      return data;
    },
    onSuccess: (_data) => {
      // todo: invalidate query for git repos
    },
  });
  return mutation;
};
