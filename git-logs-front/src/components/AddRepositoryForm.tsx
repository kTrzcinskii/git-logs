import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  useAddRepository,
  type AddRepositoryVariables,
} from "~/hooks/mutations/useAddRepository";
import { errorToastOptions } from "~/toasts/errorToastOptions";

interface Props {
  onClose: () => void;
}

export const AddRepositoryForm: React.FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<AddRepositoryVariables>();

  const toast = useToast();
  console.info(errors);
  const mutation = useAddRepository();

  const onSubmit: SubmitHandler<AddRepositoryVariables> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => onClose(),
      onError: (error) => {
        console.error("An error occured!");
        console.info(error);
        toast(errorToastOptions);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={5}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input {...register("name")} />
        </FormControl>
        <FormControl>
          <FormLabel>Url</FormLabel>
          <Input {...register("url")} />
        </FormControl>
        <Button colorScheme="purple" type="submit" isLoading={isLoading}>
          Add
        </Button>
      </VStack>
    </form>
  );
};
