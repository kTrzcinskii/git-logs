"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AddRepositoryForm } from "~/components/AddRepositoryForm";
import { RepositoriesList } from "~/components/RepositoriesList";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <main className="bg flex flex-col items-center justify-center">
        <VStack spacing={10}>
          <Button onClick={onOpen}>Add Repository</Button>
          <RepositoriesList />
        </VStack>
      </main>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Repository</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddRepositoryForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dashboard;
