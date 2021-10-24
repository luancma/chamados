import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button, useDisclosure } from "@chakra-ui/react";
import { CreateNewUpdateModal } from "../Modal/Updates/Create"

export default function Updates(prop: { updates: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateUpdate = () => {};
  return (
    <>
      {prop.updates.length && (
        <Stack marginTop="4">
          <Heading size="md" paddingY="6">
            Atualizações
          </Heading>
          <Stack
            spacing="4"
            padding="4"
            height="auto"
            border="1px"
            borderColor="blue.500"
            borderRadius="8"
          >
            {prop.updates.map((update: any, index: number) => (
              <Stack spacing="2" key={update.id}>
                {index > 0 && (
                  <Box width="100%" height="1px" bgColor="blue.500" />
                )}
                <Box>
                  <Heading as="h6" size="sm">
                    Usuário
                  </Heading>
                  <Text fontSize="sm"> {update.message}</Text>
                </Box>
                <Text fontSize="xs">update: 20min</Text>
              </Stack>
            ))}
          </Stack>
          <Button colorScheme="green" onClick={onOpen}>
            Adicionar
          </Button>
        </Stack>
      )}
      <CreateNewUpdateModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onCreate={async () => console.log("dskadma")}
      />
    </>
  );
}
