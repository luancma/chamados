import { Stack } from "@chakra-ui/layout";
import {
  Button,
  Checkbox,
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

export function CreateOrderModal({
  isOpen,
  onOpen,
  onClose,
  onCreate,
}: IModal) {
  const { handleSubmit, register, reset, watch } = useForm();

  const watchShowAge = watch("aaa", false);

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
            <ModalHeader>Nova ordem de serviço</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing="4">
                <FormControl id="first-name" isRequired>
                  <FormLabel>Bem</FormLabel>
                  <Input
                    placeholder="Bem que receberá o chamado"
                    {...register("title")}
                  />
                </FormControl>

                <FormControl id="first-name" isRequired>
                  <FormLabel>Ocorrência</FormLabel>
                  <Textarea
                    placeholder="Descrição da ordem de serviço"
                    size="md"
                    lines="3"
                    {...register("description")}
                  />
                </FormControl>

                <Checkbox defaultIsChecked={false} {...register("aaa")}>
                  Adicionar detalhes
                </Checkbox>
                {!!watchShowAge && (
                  <FormControl id="first-name" isRequired>
                    <FormLabel>Detalhes</FormLabel>
                    <Textarea
                      placeholder="Detalhes da ordem de serviço"
                      size="md"
                      lines="3"
                      {...register("details")}
                    />
                  </FormControl>
                )}
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Stack width="100%" spacing={4}>
                <Button
                  colorScheme="green"
                  borderColor="green"
                  mr={3}
                  type="submit"
                  width="100%"
                  padding="6"
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
