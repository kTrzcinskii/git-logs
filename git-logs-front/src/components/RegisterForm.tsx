import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type RegisterVariables,
  useRegister,
} from "~/hooks/mutations/useRegister";
import { errorToastOptions } from "~/toasts/errorToastOptions";

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<RegisterVariables>();

  const router = useRouter();
  console.info(errors);
  const mutation = useRegister();
  const toast = useToast();

  const onSumbit: SubmitHandler<RegisterVariables> = (data) => {
    mutation.mutate(
      { ...data },
      {
        onSuccess: () => router.push("/dashboard"),
        onError: (error) => {
          console.error("An error occured!");
          console.info(error);
          toast(errorToastOptions);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSumbit)}>
      <VStack spacing={5}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input {...register("username")} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input {...register("password")} type="password" />
        </FormControl>
        <Button colorScheme="purple" type="submit" isLoading={isLoading}>
          Register
        </Button>
      </VStack>
    </form>
  );
};
