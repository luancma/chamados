import React from "react";
import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Textarea } from "@chakra-ui/textarea";
import Updates from "../../components/Updates";
import { useRouter } from "next/router";
import { StatusBadge } from "../../components/Status/StatusBadge";

interface IServiceOrder {
  id: number;
  title: string;
  description: string;
  details: string;
  status: string;
}

const serviceOrder: Array<IServiceOrder> = [
  {
    id: 23,
    title: "Apartamento numero 20122, proximo ao blabla",
    description:
      "Mussum Ipsum, cacilds vidis litro abertis. Nullam volutpat risus nec\
    leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mais\
    vale um bebadis conhecidiss, que um alcoolatra anonimis. Suco de\
    cevadiss deixa as pessoas mais interessantis. Detraxit consequat et\
    quo num tendi nada.",
    details:
      "Mussum Ipsum, cacilds vidis litro abertis. Nullam volutpat risus nec\
    leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mais\
    vale um bebadis conhecidis.",
    status: "open",
  },
];

const updates: any = [
  {
    id: 1,
    message: "Pessoa do suporte começou o atenndimento",
    updatedAt: new Date(),
  },
  {
    id: 2,
    message: "ASKL;DJAS DASDKOD DASOKDASO",
    updatedAt: new Date(),
  },
  {
    id: 4,
    message: "ASKL;DJAS DASDKOD DASOKDASO",
    updatedAt: new Date(),
  },
  {
    id: 6,
    message: "ASKL;DJAS DASDKOD DASOKDASO",
    updatedAt: new Date(),
  },
];

type IFormLabelItem = {
  label?: string;
  itemValue?: string;
};

function ModalLabel({ label, itemValue }: IFormLabelItem) {
  return (
    <FormControl>
      <FormLabel fontSize="sm" fontWeight="bold">
        {label}
      </FormLabel>
      <Textarea value={itemValue} size="sm" isReadOnly borderColor="blue.500" />
    </FormControl>
  );
}

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Flex height="100%" paddingBottom="4">
      <Container>
        {serviceOrder.map((order: IServiceOrder) => (
          <React.Fragment key={order.id}>
            <Box paddingY="6">
              <Heading size="md">Chamado 2</Heading>
              <Text>
                Status:
                <StatusBadge status={order.status} />
              </Text>
            </Box>

            <Stack spacing="4">
              <ModalLabel label={"Bem"} itemValue={order.title} />
              <ModalLabel label={"Ocorrência"} itemValue={order.description} />
              {!!order.details && (
                <ModalLabel label={"Detalhes"} itemValue={order.details} />
              )}
            </Stack>
          </React.Fragment>
        ))}
        <Updates updates={updates} />
      </Container>
    </Flex>
  );
}
