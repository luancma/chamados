import React from "react";
import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import Updates from "../../components/Updates";
import { useRouter } from "next/router";
import { StatusBadge } from "../../components/Status/StatusBadge";
import { GetStaticPaths, GetStaticProps } from 'next'
import {ModalLabel} from "../../components/ModalLabel"

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

export default function Details({ order }: any) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Flex height="100%" paddingBottom="4" className="fade-in">
      <Container>
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
        <Updates updates={updates} />
      </Container>
    </Flex>
  );
}


export const getStaticPaths: GetStaticPaths = async () => {
  const orders = await fetch(
    "https://my-json-server.typicode.com/luancma/json-server/orders"
  ).then(response => response.json())
  
  const paths = orders.map((order: any) => ({
    params: { id: `${order.id}`},
  }));

  return { paths, fallback: true  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const order = await fetch(
    `https://my-json-server.typicode.com/luancma/json-server/orders/${params?.id}`
  ).then(response => response.json())

  if (!order) {
    return {
      notFound: true,
    };
  }
  
  return { props: { order, revalidate: 60 * 24  } };
}

export interface Props {
  id?: string;
}