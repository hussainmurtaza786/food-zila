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
  Image,
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
// import { addProduct, updateProduct, deleteProduct } from .";
import { Oswald, Nunito } from "@next/font/google";

type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};

const oswald = Oswald({ weight: "700", subsets: ["latin-ext"] });
const nunito = Nunito({ weight: "400", subsets: ["latin-ext"] });

export default function DashBoardTable({ products }: { products: Product[] }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState<Product | Partial<Product>>({});
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  

  const openModal = (product?: Product) => {
    if (product) {
      setForm(product);
      setEditing(true);
    } else {
      setForm({});
      setEditing(false);
    }
    onOpen();
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
        sx={{ fontFamily: nunito.style.fontFamily }}
      >
        <Button colorScheme="teal" onClick={() => openModal()} mb={4}>
          Add Product
        </Button>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption className={oswald.className}>Product List</TableCaption>
            <Thead>
              <Tr>
                <Th className={oswald.className}>Title</Th>
                <Th className={oswald.className}>Price</Th>
                <Th className={oswald.className}>Description</Th>
                <Th className={oswald.className}>Image URL</Th>
                <Th className={oswald.className}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((item: Product) => (
                <Tr key={item.id}>
                  <Td>{item.title}</Td>
                  <Td>{item.price}Pkr</Td>
                  <Td whiteSpace="normal" w="300px">
                    {item.description}
                  </Td>
                  <Td whiteSpace="normal" maxWidth="400px" wordBreak="break-word">
                    <Image src={item.imgUrl} alt={item.title} maxWidth="150px" />
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => openModal(item)}
                      mr={2}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"

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

      {/* Modal for Add/Edit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing ? "Edit Product" : "Add Product"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              name="title"
              value={form.title || ""}
              onChange={handleInputChange}
              mb={2}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={form.price || ""}
              onChange={handleInputChange}
              mb={2}
            />
            <Input
              placeholder="Description"
              name="description"
              value={form.description || ""}
              onChange={handleInputChange}
              mb={2}
            />
            <Input
              placeholder="Image URL"
              name="imgUrl"
              value={form.imgUrl || ""}
              onChange={handleInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" >
              {editing ? "Update" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
