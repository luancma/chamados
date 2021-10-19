import { Box, Heading, Container, Text, Stack } from "@chakra-ui/layout";
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
import React, { MouseEventHandler, useState } from "react";
import { useQuery } from "react-query";
import { MdAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { StatusBadge } from "../components/Status/StatusBadge";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

interface IOS {
  id: number;
  title: string;
  status: string;
}

interface IBasicModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function BasicUsage({ isOpen, onOpen, onClose }: IBasicModal) {
  const [showDescription, setShowDescription] = React.useState<boolean>(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const watchShowAge = watch("aaa", false);

  async function onSubmit(values: any) {
    const url = "https://my-json-server.typicode.com/luancma/json-server/orders";
    const response = await fetch(url, {
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
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function handleCloseModal() {
    reset();
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="full">
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Nova ordem de serviço</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing="4">
                <FormControl id="first-name" isRequired>
                  <FormLabel>Bem</FormLabel>
                  <Input
                    placeholder="Bem que receberá o chamado"
                    {...register("title")}
                  />
                </FormControl>

                <FormControl id="first-name" isRequired>
                  <FormLabel>Ocorrência</FormLabel>
                  <Textarea
                    placeholder="Descrição da ordem de serviço"
                    size="md"
                    lines="3"
                    {...register("description")}
                  />
                </FormControl>

                <Checkbox defaultIsChecked={false} {...register("aaa")}>
                  Adicionar detalhes
                </Checkbox>
                {!!watchShowAge && (
                  <FormControl id="first-name" isRequired>
                    <FormLabel>Detalhes</FormLabel>
                    <Textarea
                      placeholder="Detalhes da ordem de serviço"
                      size="md"
                      lines="3"
                      {...register("details")}
                    />
                  </FormControl>
                )}
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Stack width="100%" spacing={4}>
                <Button
                  colorScheme="green"
                  borderColor="green"
                  mr={3}
                  type="submit"
                  width="100%"
                  padding="6"
                  variant="solid"
                >
                  Criar
                </Button>
                <Button
                  borderColor="red"
                  color="red"
                  variant="outline"
                  onClick={handleCloseModal}
                  width="100%"
                  padding="6"
                >
                  Cancelar
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default function Home() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, error, data } = useQuery(
    "repoData",
    () => fetch("https://my-json-server.typicode.com/luancma/json-server/orders").then((res) => res.json()),
    {
      refetchInterval: 30 * 1000,
    }
  );

  const handleOpenModal = () => {
    onOpen();
  };

  function childrenDetails(id: number) {
    router.push(`detalhes/${id}`);
  }

  const getOpenTasks = () => data.filter((task) => task.status === "open");

  const getClosedTasks = () => data.filter((task) => task.status === "close");

  const getInProgressTasks = () =>
    data.filter((task) => task.status === "in_progress");

  if (isLoading) {
    return <Spinner />;
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
          position="sticky"
          left="0"
          top="64px"
        >
          <TabList mb="1rem">
            <Tab>Abertas</Tab>
            <Tab>Iniciadas</Tab>
            <Tab>Terminadas</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0">
              <Container>
                {getOpenTasks(data).map((serviceOrder: IOS) => (
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
            </TabPanel>
            <TabPanel p="0">
              <Container>
                {getClosedTasks(data).length ? (
                  getClosedTasks(data).map((serviceOrder: IOS) => (
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
                  ))
                ) : (
                  <Text>Nenhum chamado</Text>
                )}
              </Container>
            </TabPanel>
            <TabPanel p="0" h="100%">
              {getInProgressTasks(data).map((serviceOrder: IOS) => (
                <Container key={serviceOrder.id}>
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
                </Container>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <Container>
          {data?.map((serviceOrder: IOS) => (
            <Box
              boxShadow="lg"
              p="4"
              key={serviceOrder?.id}
              m="4"
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
        </Container> */}
      </Box>
      <BasicUsage isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
