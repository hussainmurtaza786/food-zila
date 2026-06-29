"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Spinner,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProductTable from "./ProductTable";
import UserTable from "./UserTable";
import { Oswald, Patrick_Hand, Merriweather } from "@next/font/google";

const oswald = Oswald({ weight: "700", subsets: ["latin-ext"] });
const patrick_hand = Patrick_Hand({ weight: "400", subsets: ["latin-ext"] });
const merriweather = Merriweather({ weight: "700", subsets: ["latin"] });

type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

export default function DashBoard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showProductTable, setShowProductTable] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toast = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    setShowProductTable(false);
    setShowUserTable(false);

    try {
      const response = await fetch("http://localhost:3000/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.data);
      setShowUserTable(true);
    } catch {
      setError("Failed to load users.");
      toast({
        title: "Error",
        description: "Failed to load users.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    setShowProductTable(false);
    setShowUserTable(false);

    try {
      const response = await fetch("http://localhost:3000/api/admin/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data.products);
      setShowProductTable(true);
    } catch {
      setError("Failed to load products.");
      toast({
        title: "Error",
        description: "Failed to load products.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex
        direction={{ base: "column", md: "row" }}
        minH="100vh"
      >
        {/* Sidebar */}
        <Box
          w={{ base: "100%", md: "280px" }}
          bg="linear-gradient(135deg,#D1E8E2,#AEEEEE,#F5F5F5)"
          p={{ base: 5, md: 8 }}
        >
          <Text
            className={patrick_hand.className}
            fontSize={{ base: "3xl", md: "5xl" }}
            mb={6}
            color="teal.600"
            textAlign={{ base: "center", md: "left" }}
          >
            Dashboard
          </Text>

          <Box
            display="flex"
            flexDirection={{ base: "row", md: "column" }}
            gap={{ base: 4, md: 3 }}
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              cursor="pointer"
              onClick={fetchProducts}
              className={oswald.className}
            >
              Product List
            </Text>

            <Text
              fontSize="xl"
              fontWeight="bold"
              cursor="pointer"
              onClick={fetchUsers}
              className={oswald.className}
            >
              User List
            </Text>
          </Box>

          {/* Create Account */}
          <Box mt={8} textAlign={{ base: "center", md: "left" }}>
            <Text
              className={merriweather.className}
              fontSize="lg"
              fontWeight="bold"
              mb={3}
            >
              Make Account
            </Text>

            <Button w={{ base: "100%", md: "auto" }} colorScheme="teal" onClick={() => setIsModalOpen(true)}>
              Create Account
            </Button>
          </Box>
        </Box>

        {/* Main */}
        <Flex direction="column" flex="1">
          {/* Header */}
          <Box bg="blue.500" p={6}>
            <Text
              fontSize={{ base: "2xl", md: "5xl" }}
              color="white"
              textAlign="center"
              className={patrick_hand.className}
            >
              Welcome to Dashboard
            </Text>
          </Box>

          {/* Content */}
          <Box p={{ base: 4, md: 8 }} flex="1">
            {loading ? (
              <Flex justify="center" align="center" h="300px">
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : error ? (
              <Text textAlign="center" color="red.500">
                {error}
              </Text>
            ) : showProductTable ? (
              <Box overflowX="auto">
                <ProductTable products={products} />
              </Box>
            ) : showUserTable ? (
              <Box overflowX="auto">
                <UserTable users={users} />
              </Box>
            ) : (
              <Text textAlign="center" color="gray.500">
                Select Product or User List
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={{ base: "sm", md: "md" }}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                phoneNumber: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await fetch("/api/admin/users", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                  });

                  toast({
                    title: "Success",
                    description: "Account created",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });

                  setIsModalOpen(false);
                } catch {
                  toast({
                    title: "Error",
                    description: "Failed to create account",
                    status: "error",
                  });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormControl mb={3}>
                    <FormLabel>Name</FormLabel>
                    <Field as={Input} name="name" />
                  </FormControl>

                  <FormControl mb={3}>
                    <FormLabel>Phone</FormLabel>
                    <Field as={Input} name="phoneNumber" />
                  </FormControl>

                  <FormControl mb={3}>
                    <FormLabel>Email</FormLabel>
                    <Field as={Input} name="email" />
                  </FormControl>

                  <FormControl mb={3}>
                    <FormLabel>Password</FormLabel>
                    <Field as={Input} type="password" name="password" />
                  </FormControl>

                  <Button
                    mt={4}
                    w="100%"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Create
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}