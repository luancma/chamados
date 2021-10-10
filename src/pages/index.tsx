import {
  Box,
  Circle,
  Heading,
  Container,
  Text,
  Badge,
} from "@chakra-ui/layout";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import MenuAppBar from "../components/Appbar";

interface IOS {
  id: number;
  title: string;
  status: string;
}

export default function Home() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://127.0.0.1:3001/orders").then((res) => res.json())
  , {
    refetchInterval: 30 * 1000
  });

  console.log(data);
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box align="center" justify="center" h="100vh">
        <MenuAppBar />

        <Container>
          {data?.map((serviceOrder: IOS) => (
            <Box boxShadow="lg" p="4" key={serviceOrder?.id} m="4" >
              <Heading as="h6" size="xs" sx={{ textAlign: "justify" }}>
                {serviceOrder.title}
              </Heading>
              <Text align="justify" fontWeight="bolder">
                Status:{" "}
                <Badge colorScheme="orange">{serviceOrder.status}</Badge>
              </Text>
              <Text fontSize="xs" align="justify">
                20 min atras
              </Text>
            </Box>
          ))}
        </Container>
      </Box>
      <Circle
        w="14"
        h="14"
        bg="gray.400"
        p="4"
        pos="fixed"
        bottom="4"
        right="4"
      >
        Cover
      </Circle>
    </div>
  );
}