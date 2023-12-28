import { type UseToastOptions } from "@chakra-ui/react";

export const errorToastOptions: UseToastOptions = {
  status: "error",
  title: "An error occured",
  description: "Please try again later",
  duration: 5000,
  isClosable: true,
};
