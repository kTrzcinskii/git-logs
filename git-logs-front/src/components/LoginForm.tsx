import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<Inputs>();

  console.info(errors);
  const onSumbit: SubmitHandler<Inputs> = (data) => console.info(data);

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
