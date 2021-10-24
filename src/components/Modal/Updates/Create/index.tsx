import { Stack } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCreate: (values: any) => Promise<void>;
}

export function CreateNewUpdateModal({
  isOpen,
  onOpen,
  onClose,
  onCreate,
}: IModal) {
  const { handleSubmit, register, reset, watch } = useForm();

  const handleCreateNewOrder = async (values: any) => {
    await onCreate(values);
    handleCloseModal();
  };

  function handleCloseModal() {
    reset();
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="full">
        <ModalOverlay />
        <form onSubmit={handleSubmit(handleCreateNewOrder)}>
          <ModalContent>
            <ModalHeader>Nova atualização</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing="4">
                <FormControl id="title-name" isRequired>
                  <FormLabel>Título</FormLabel>
                  <Textarea
                    placeholder="Detalhes da atualização"
                    size="md"
                    lines="3"
                    {...register("details")}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Stack width="100%" spacing={4}>
                <Button
                  colorScheme="green"
                  borderColor="green"
                  type="submit"
                  width="100%"
                  padding="6
                  "
                  variant="solid"
                >
                  Criar
                </Button>
                <Button
                  borderColor="red"
                  color="red"
                  variant="outline"
                  onClick={handleCloseModal}
                  width="100%"
                  padding="6"
                >
                  Cancelar
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
