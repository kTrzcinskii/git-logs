import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["repositories"] });
    },
  });
  return mutation;
};
