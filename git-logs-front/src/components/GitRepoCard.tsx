import {
  Card,
  CardHeader,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RepositoryLogs } from "./RepositoryLogs";

interface Props {
  id: number;
  name: string;
  repositoryUrl: string;
}

export const GitRepoCard: React.FC<Props> = ({ id, name, repositoryUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card width={300} cursor="pointer" onClick={onOpen}>
        <CardHeader>
          <Heading size="sm">{name}</Heading>
        </CardHeader>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name} - logs:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RepositoryLogs id={id} link={repositoryUrl} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
