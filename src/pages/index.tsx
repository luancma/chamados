import { Box, Heading, Container, Text, Stack, Flex } from "@chakra-ui/layout";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { MdAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { StatusBadge } from "../components/Status/StatusBadge";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { TabContent } from "../components/TabContent";
import { CreateOrderModal } from "../components/Modal/Create";
import { instance } from "../utils/api/instance";
interface IResponse {
  id: number;
  title: string;
  status: string;
  description?: string;
  aaa?: string;
  details?: string;
}

export default function Home() {
  async function test() {
    return await instance.get("/orders").then((response) => response.data);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery("ordensState", test);

  const handleOpenModal = () => {
    onOpen();
  };

  const getOpenTasks = (data: Array<IResponse>) =>
    data.filter((task) => task.status === "open");

  const getClosedTasks = (data: Array<IResponse>) =>
    data.filter((task) => task.status === "close");

  const getInProgressTasks = (data: Array<IResponse>) =>
    data.filter((task) => task.status === "in_progress");

  const createServiceOrder = async (values: any) => {
    const url =
      "https://my-json-server.typicode.com/luancma/json-server/orders";
    return await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        ...values,
        status: "open",
      }), // body data type must match "Content-Type" header
    }).then((response) => response);
  };

  if (!data) {
    return (
      <Container>
        <Spinner></Spinner>
      </Container>
    );
  }

  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box align="center" justify="center">
        <Tabs
          isFitted
          variant="enclosed"
          w="100%"
          position="fixed"
          left="0"
          top="64px"
        >
          <TabList maxWidth="1024px">
            <Tab paddingY="4">Abertas</Tab>
            <Tab>Iniciadas</Tab>
            <Tab>Terminadas</Tab>
          </TabList>
          <TabPanels height="calc(100vh - 104px)" overflow="auto">
            <TabPanel p="0" height="100%" className="fade-in-right">
              <TabContent data={getOpenTasks(data)} />
            </TabPanel>
            <TabPanel p="0" height="100%" className="fade-in-right">
              <TabContent data={getInProgressTasks(data)} />
            </TabPanel>
            <TabPanel p="0" height="100%" className="fade-in-right">
              <TabContent data={getClosedTasks(data)} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <CreateOrderModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onCreate={createServiceOrder}
      />
      <IconButton
        aria-label="Call Sage"
        borderRadius={"50%"}
        onClick={handleOpenModal}
        w="14"
        h="14"
        colorScheme="blue"
        p="4"
        pos="fixed"
        bottom="4"
        right="4"
        icon={<MdAdd color="white" size="3.5rem" />}
      />
    </div>
  );
}

export async function getStaticProps() {
  const getOrders = () =>
    instance.get("/orders").then((response) => response.data);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("ordensState", getOrders);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
