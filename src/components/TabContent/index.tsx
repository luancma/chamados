import { Box, Heading, Container, Text, Stack, Flex } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { StatusBadge } from "../Status/StatusBadge";

export function TabContent({ data }: ITabContent) {
  const router = useRouter();

  function childrenDetails(id: number) {
    router.push(`detalhes/${id}`);
  }

  return (
    <>
      {!data.length ? (
        <Flex align="center" justify="center" direction="column" height="100%">
          <Text>Nenhum chamado nessa categoria.</Text>
        </Flex>
      ) : (
        <Container paddingY="4" height="100%">
          {data.map((serviceOrder: IOS) => (
            <Box
              boxShadow="lg"
              p="4"
              key={serviceOrder?.id}
              onClick={() => childrenDetails(serviceOrder.id)}
            >
              <Heading as="h6" size="sm" sx={{ textAlign: "justify" }}>
                {serviceOrder.title}
              </Heading>
              <Text align="justify" fontSize="sm" fontWeight="bolder">
                Status: <StatusBadge status={serviceOrder.status} />
              </Text>
              <Text fontSize="xs" align="justify">
                20 min atras
              </Text>
            </Box>
          ))}
        </Container>
      )}
    </>
  );
}

interface IResponse {
  id: number;
  title: string;
  status: string;
  description?: string;
  aaa?: string;
  details?: string;
}

interface ITabContent {
  data: Array<IResponse>;
}

interface IOS {
  id: number;
  title: string;
  status: string;
}
