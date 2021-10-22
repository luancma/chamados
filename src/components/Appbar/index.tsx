import { Box, Flex } from "@chakra-ui/layout";
import { FaArrowLeft } from "react-icons/fa";

export default function Appbar() {
  return (
    <Flex
      direction="column"
      justify="center"
      w="100%"
      h="4rem"
      bg="blue.500"
      pos="sticky"
      top="0"
      left="0"
      zIndex="banner"
    >
      <Box pos="absolute" left="1rem">
        <FaArrowLeft size="24px" color="white"/>
      </Box>
    </Flex>
  );
}
