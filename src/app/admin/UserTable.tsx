import React, { useState } from "react";
import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addUser, updateUser, deleteUser } from "@/redux/slices/admin/userSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Type for a user
type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: String
};

const userSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "Phone Number must be exactly 11 digits")
    .required("Phone Number is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  role: Yup.string()
});

export default function UserTable({ users: initialUsers }: { users: User[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editing, setEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const deleteData = async (id: string) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      setUsers(users.filter((user) => user.id !== id)); // Update state locally
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setEditing(false);
    onOpen();
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditing(true);
    onOpen();
  };

  const addData = async (values: any) => {
    try {
      const newUser = await dispatch(addUser(values)).unwrap();
      if (newUser && newUser.id) {
        setUsers([...users, newUser]); // Add new user locally
        onClose();
      } else {
        console.error("Failed to add user: Invalid user data", newUser);
      }
    } catch (err) {
      console.log(err.response)
      console.error("Failed to add user:", err);
    }
  };

  const updateData = async (values: User) => {
    try {
      const updatedUser = await dispatch(updateUser(values)).unwrap();
      if (updatedUser) {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        onClose();
      } else {
        console.error("Failed to update user: Invalid updated data", updatedUser);
      }
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };


  // console.log("users ==>", users)

  return (
    <Flex justify="center" align="center" h="100%">
      <Box
        w="100%"
        overflowX="auto"
        border="1px solid teal"
        p={4}
        borderRadius="md"
        boxShadow="xl"
      >
        <Button colorScheme="teal" onClick={openAddModal} mb={4}>
          Add User
        </Button>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>User List</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th color="yellow.500" fontWeight="bold">Role</Th> {/* Highlight role header */}
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user: User) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phoneNumber}</Td>
                  <Td color="teal.500" fontWeight="semibold"> {/* Highlight role text */}
                    {user.role}
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => openEditModal(user)}
                      mr={2}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => deleteData(user.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

      </Box>

      {/* Modal for Add or Edit User */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing ? "Edit User" : "Add User"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                name: selectedUser?.name || "",
                email: selectedUser?.email || "",
                phoneNumber: selectedUser?.phoneNumber || "",
                password: "", // Add password field in initialValues
                role: ""
              }}
              validationSchema={userSchema}
              onSubmit={(values) => {
                if (editing && selectedUser) {
                  const updatedUser = { ...values, id: selectedUser.id };
                  updateData(updatedUser);
                } else {
                  addData(values);
                }
              }}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <Field
                    name="name"
                    as={Input}
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                    mb={2}
                  />
                  <Field
                    name="email"
                    as={Input}
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                    mb={2}
                  />
                  <Field
                    name="phoneNumber"
                    as={Input}
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                    mb={2}
                  />
                  <Field
                    name="password"
                    type="password" // Make the password field type="password"
                    as={Input}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                    mb={2}
                  />
                  <ModalFooter>
                    <Button type="submit" colorScheme="teal">
                      {editing ? "Update User" : "Add User"}
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>

          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
