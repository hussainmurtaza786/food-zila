import React, { useState } from "react";
import { Box, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex, Button, useDisclosure, } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addUser, updateUser, deleteUser } from "@/redux/slices/admin/userSlice";
import UserModal from "./UserModal";
export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string
};

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

  const handleSave = async (values: User) => {
    try {
      if (editing && selectedUser) {
        const updatedUser = { ...values, id: selectedUser.id };
        const result = await dispatch(updateUser(updatedUser)).unwrap();
        setUsers(users.map((user) => (user.id === result.id ? result : user)));
      } else {
        const newUser = await dispatch(addUser(values)).unwrap();
        setUsers([...users, newUser]);
      }
      onClose();
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

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

      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        editing={editing}
        selectedUser={selectedUser}
      />
    </Flex>
  );
}
