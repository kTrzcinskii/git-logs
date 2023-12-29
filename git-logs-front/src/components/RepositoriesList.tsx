import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, IconButton, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useGetAllRepositories } from "~/hooks/queries/useGetAllRepositories";
import { errorToastOptions } from "~/toasts/errorToastOptions";
import { GitRepoCard } from "./GitRepoCard";

export const RepositoriesList = () => {
  const [page, setPage] = useState(0);
  const { data, isError, isPlaceholderData, isFetching, isPending } =
    useGetAllRepositories(page);
  const toast = useToast();
  if (isError) {
    toast(errorToastOptions);
  }
  return (
    <VStack spacing={8}>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <VStack spacing={4}>
          {data?.content.map((gitRepo) => (
            <GitRepoCard {...gitRepo} key={gitRepo.id} />
          ))}
        </VStack>
      )}
      <HStack spacing={10}>
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous Page"
          onClick={() => setPage((prev) => prev - 1)}
          isDisabled={page === 0}
          isLoading={isFetching}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="NextPage"
          onClick={() => setPage((prev) => prev + 1)}
          isDisabled={isPlaceholderData || data?.last}
          isLoading={isFetching}
        />
      </HStack>
    </VStack>
  );
};
