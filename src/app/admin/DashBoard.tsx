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
  FormErrorMessage
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProductTable from "./ProductTable";
import UserTable from "./UserTable"; // Assuming you have a UserTable component
import { Oswald, Patrick_Hand, Merriweather } from '@next/font/google';

const oswald = Oswald({ weight: "700", subsets: ["latin-ext"] });
const patrick_hand = Patrick_Hand({ weight: "400", subsets: ['latin-ext'] });
const merriweather = Merriweather({ weight: "700", subsets: ['latin'] });

type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  phoneNumber: Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must be numeric'),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function DashBoard({ userRole }: { userRole: string }) {  // Add userRole as a prop
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showProductTable, setShowProductTable] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal visibility
  const toast = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    setShowProductTable(false)
    setShowUserTable(false)

    try {
      const response = await fetch("http://localhost:3000/api/admin/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.data);
      setShowUserTable(true);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load users.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/admin/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
      setShowProductTable(true);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load products.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Flex direction={["column", "row"]} h="100vh">
        {/* Sidebar */}
        <Box
          bg="linear-gradient(135deg, #D1E8E2, #AEEEEE, #F5F5F5)"
          flex="1"
          p={8}
          boxShadow="xl"
        >
          <Text className={patrick_hand.className} fontSize="5xl" mb={6} color="teal.600">
            Dashboard
          </Text>

          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={4}
            cursor="pointer"
            onClick={fetchProducts}
            className={oswald.className}
          >
            Product List
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={4}
            cursor="pointer"
            onClick={fetchUsers}
            className={oswald.className}
          >
            User List
          </Text>

          {/* "Create Account" Section - Render only if the user is an admin */}
          {userRole === "admin" && (
            <Box>
              <Text className={merriweather.className} fontSize="xl" fontWeight="bold" mb={4}>
                Make Account For Subordinate
              </Text>
              <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>Create Account</Button>
            </Box>
          )}
        </Box>

        {/* Main Content */}
        <Flex direction="column" flex="4">
          {/* Welcome Box */}
          <Box bgColor="blue.500" boxShadow="xl" p="5">
            <Text
              fontSize="5xl"
              color="white"
              fontWeight="bold"
              textAlign="center"
              className={patrick_hand.className}
            >
              Welcome to the Dashboard
            </Text>
          </Box>

          {/* Table or Spinner */}
          <Box flex="1" p={8}>
            {loading ? (
              <Flex justify="center" align="center" h="100%">
                <Spinner color="teal.500" size="xl" />
              </Flex>
            ) : error ? (
              <Text textAlign="center" color="red.500">
                {error}
              </Text>
            ) : showProductTable ? (
              <ProductTable products={products} />
            ) : showUserTable ? (
              <UserTable users={users} />
            ) : (
              <Text textAlign="center" color="gray.500">
                Click on "Product List" or "User List" to load the table.
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>

      {/* Modal for Creating Account */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Subordinate Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name: "", phoneNumber: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await fetch("/api/admin/users", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  });
                  const data = await response.json();
                  if (!response.ok) {
                    throw new Error("Failed to create account");
                  }

                  handleModalClose();
                  toast({
                    title: "Account Created",
                    description: "Subordinate account has been created.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "There was an issue creating the account.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field as={Input} id="name" name="name" />
                    <ErrorMessage name="name" component="div" />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <Field as={Input} id="phoneNumber" name="phoneNumber" />
                    <ErrorMessage name="phoneNumber" component="div" />
                  </FormControl>

                  <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" />
                    <ErrorMessage name="email" component="div" />
                  </FormControl>

                  <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field as={Input} id="password" name="password" type="password" />
                    <ErrorMessage name="password" component="div" />
                  </FormControl>

                  <ModalFooter>
                    <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>Create Account</Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
