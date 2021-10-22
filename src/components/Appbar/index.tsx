import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/layout";
import { FaArrowLeft } from "react-icons/fa";

export default function Appbar() {
  const router = useRouter();

  const isValidatedPage = router.asPath !== "/";

  const handleBack = () => {
    if (isValidatedPage) {
      return router.back();
    }
  };

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
      <Box pos="absolute" left="1rem" onClick={handleBack}>
        <FaArrowLeft size="24px" color="white" />
      </Box>
    </Flex>
  );
}
