"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { LoginForm } from "~/components/LoginForm";
import { RegisterForm } from "~/components/RegisterForm";

export default function HomePage() {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  return (
    <>
      <main className="bg flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Git <span className="text-[hsl(280,100%,70%)]">Logs</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Button onClick={onOpenLogin}>Login</Button>
            <Button onClick={onOpenRegister}>Register</Button>
          </div>
        </div>
      </main>

      <Modal isOpen={isOpenLogin} onClose={onCloseLogin} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenRegister} onClose={onCloseRegister} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
