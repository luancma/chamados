import React from "react";
import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import Updates from "../../components/Updates";
import { useRouter } from "next/router";
import { StatusBadge } from "../../components/Status/StatusBadge";
import { GetStaticPaths, GetStaticProps } from "next";
import { ModalLabel } from "../../components/ModalLabel";
import { instance } from "../../utils/api/instance";
import { QueryClient, useQuery } from "react-query";

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

export default function Details({ order }: any) {
  const router = useRouter();


  const updatesProps = async () =>
    await instance
      .get<Array<any>>(`/updates?order_id=${order?.id}`)
      .then((response) => response.data);

  const {
    data: updates,
    isLoading,
    isFetching,
  } = useQuery("updateState", updatesProps);

  const showLoading = router.isFallback || isLoading;

  return (
    <>
      {showLoading ? (
        <div>Loading...</div>
      ) : (
        <Flex height="100%" paddingBottom="4" className="fade-in">
          <Container>
            <React.Fragment key={order.id}>
              <Box paddingY="6">
                <Heading size="md">Detalhes</Heading>
                <Text>
                  Status:
                  <StatusBadge status={order.status} />
                </Text>
              </Box>

              <Stack spacing="4">
                <ModalLabel label={"Bem"} itemValue={order.title} />
                <ModalLabel
                  label={"Ocorrência"}
                  itemValue={order.description}
                />
                {!!order.details && (
                  <ModalLabel label={"Detalhes"} itemValue={order.details} />
                )}
              </Stack>
            </React.Fragment>
            <Updates updates={updates} />
          </Container>
        </Flex>
      )}
    </>
  );
}

interface IOrder {
  id: number;
  description: string;
  title: string;
  details: string;
  status: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
  const orders = await instance
    .get<Array<IOrder>>("/orders")
    .then((response) => response.data);

  const paths = orders.map((order: any) => ({
    params: { id: `${order.id}` },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const order = await instance
    .get<Array<IOrder>>(`/orders/${params?.id}`)
    .then((response) => response.data);

  if (!order) {
    return {
      notFound: true,
    };
  }

  return { props: { order, revalidate: 60 * 24 } };
};

export interface Props {
  id?: string;
}
