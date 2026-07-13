"use client";

import React, { useState } from "react";
import {
  Box, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex, Button,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addUser, updateUser, deleteUser } from "@/redux/slices/admin/userSlice";
import { Formik, Form, Field } from "formik";
import { userValidationSchema } from "@/lib/validations";
import { User, UserFormValues } from "@/types/user";

export default function UserTable({ users: initialUsers }: { users: User[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editing, setEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const deleteData = async (id: string) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      setUsers(users.filter((user) => user.id !== id));
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

  const addData = async (values: UserFormValues) => {
    try {
      const newUser = await dispatch(addUser(values)).unwrap();
      if (newUser && newUser.id) {
        setUsers([...users, newUser]);
        onClose();
      }
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  const updateData = async (values: User) => {
    try {
      const updatedUser = await dispatch(updateUser(values)).unwrap();
      if (updatedUser) {
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        onClose();
      }
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <Flex justify="center" align="center" h="100%">
      <Box w="100%" overflowX="auto" border="1px solid teal" p={4} borderRadius="md" boxShadow="xl">
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
                <Th color="yellow.500" fontWeight="bold">Role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user: User) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phoneNumber}</Td>
                  <Td color="teal.500" fontWeight="semibold">{user.role}</Td>
                  <Td>
                    <Button size="sm" colorScheme="blue" onClick={() => openEditModal(user)} mr={2}>
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => deleteData(user.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

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
                password: "",
                role: "",
              }}
              validationSchema={userValidationSchema}
              onSubmit={(values) => {
                if (editing && selectedUser) {
                  updateData({ ...values, id: selectedUser.id });
                } else {
                  addData(values);
                }
              }}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <Field name="name" as={Input} placeholder="Name" value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.name && !!errors.name} mb={2} />
                  <Field name="email" as={Input} placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.email && !!errors.email} mb={2} />
                  <Field name="phoneNumber" as={Input} placeholder="Phone Number" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.phoneNumber && !!errors.phoneNumber} mb={2} />
                  <Field name="password" type="password" as={Input} placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.password && !!errors.password} mb={2} />
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
