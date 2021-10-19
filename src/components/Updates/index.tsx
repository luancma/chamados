import { Box, Divider, Heading, Stack, Text } from "@chakra-ui/layout";
import Status from "../../utils/Status";

export default function Updates(prop: { updates: any }) {
  const getCurrentStatus = (status) => Status.getCurrentOrderStatus(status);

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
          >
            {prop.updates.map((update: any, index: number) => (
              <Stack spacing="2" key={update.id}>
                {index > 0 && <Box width="100%" height="1px" bgColor="blue.500" />}
                <Box>
                  <Heading as="h6" size="sm">
                    Luiz
                  </Heading>
                  <Text fontSize="sm"> {update.message}</Text>
                </Box>
                <Text fontSize="xs">update: 20min</Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}
