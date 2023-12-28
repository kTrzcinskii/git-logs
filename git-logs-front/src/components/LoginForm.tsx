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
import { type LoginVariables, useLogin } from "~/hooks/mutations/useLogin";
import { errorToastOptions } from "~/toasts/errorToastOptions";

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginVariables>();

  const router = useRouter();
  console.info(errors);
  const mutation = useLogin();
  const toast = useToast();

  const onSumbit: SubmitHandler<LoginVariables> = (data) => {
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
          Login
        </Button>
      </VStack>
    </form>
  );
};
