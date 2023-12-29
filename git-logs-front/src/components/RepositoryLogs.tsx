import { VStack, useToast } from "@chakra-ui/react";
import { useGetLogs } from "~/hooks/queries/useGetLogs";
import { RepositoryLogCard } from "./RepositoryLogCard";
import { errorToastOptions } from "~/toasts/errorToastOptions";

interface Props {
  id: string | number;
  link: string;
}

export const RepositoryLogs: React.FC<Props> = ({ id, link }) => {
  const { data, isError, isPending } = useGetLogs(id);
  const toast = useToast();
  if (isError) {
    toast(errorToastOptions);
    return (
      <p>
        An error ouccured, try again later (make sure {link} is correct url of
        public repository!)
      </p>
    );
  }
  return (
    <VStack spacing={8}>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <VStack spacing={4}>
          {data?.map((logs) => (
            <RepositoryLogCard {...logs} key={logs.commitId} />
          ))}
        </VStack>
      )}
    </VStack>
  );
};
