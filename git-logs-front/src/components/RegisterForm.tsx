import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useRegister } from "~/hooks/mutations/useRegister";

interface Inputs {
  username: string;
  password: string;
}

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<Inputs>();

  const router = useRouter();
  console.info(errors);
  const mutation = useRegister();
  const onSumbit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(
      { ...data },
      {
        onSuccess: () => router.push("/dashboard"),
        onError: () => console.error("An error occured!"),
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
