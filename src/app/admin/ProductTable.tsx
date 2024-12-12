import React, { useState } from "react";
import {
  useToast, Box, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex, Image, Button,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Oswald, Nunito } from "@next/font/google";
import { deleteProduct, updateProduct, addProduct } from "@/redux/slices/admin/productSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Type for a product
type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};

const oswald = Oswald({ weight: "700", subsets: ["latin-ext"] });
const nunito = Nunito({ weight: "400", subsets: ["latin-ext"] });

// Utility function to convert title to slug
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};


const addProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  imgUrl: Yup.string().required("Image URL is Required"),
  price: Yup.number().min(1, "Price should be greater than 1").required("Price is Required"),
});

const updateProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  imgUrl: Yup.string().required("Image URL is Required"),
  price: Yup.number().min(1, "Price should be greater than 1").required("Price is Required"),
});

export default function ProductTable({ products: initialProducts }: { products: Product[] }) {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  // Example of calling deleteData
  const deleteData = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      setProducts(products.filter((product) => product.id !== id)); // Update state locally
      onClose()
    } catch (err: any) {
      console.log(err);
    }
  };


  const openAddModal = () => {
    setSelectedProduct(null);
    setEditing(false);
    onOpen();
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setEditing(true);
    onOpen();
  };

  const addData = async (values: any) => {
    try {
      const newProduct = await dispatch(addProduct(values)).unwrap();
      setProducts([...products, newProduct]); // Add new product locally
      onClose();
    } catch (err) {
      console.log(err);


      console.error("Failed to add product:", err);
    }
  };

  const updateData = async (values: Product) => {
    try {
      const updatedProduct = await dispatch(updateProduct(values)).unwrap();
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      onClose();
    } catch (err) {
      console.log(err);


      console.error("Failed to update product:", err);
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
        sx={{ fontFamily: nunito.style.fontFamily }}
      >
        <Button colorScheme="teal" onClick={openAddModal} mb={4}>
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
                    <Image
                      borderRadius="12px"
                      src={item.imgUrl}
                      alt={item.title}
                      maxWidth="150px"
                    />
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => openEditModal(item)}
                      mr={2}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => deleteData(item.id)}
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

      {/* Modal for Add or Edit Product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing ? "Edit Product" : "Add Product"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: selectedProduct?.title || "",
                price: selectedProduct?.price || 0,
                description: selectedProduct?.description || "",
                imgUrl: selectedProduct?.imgUrl || "",
              }}
              validationSchema={editing ? updateProductSchema : addProductSchema}
              onSubmit={(values) => {
                const productWithSlug = { ...values, slug: generateSlug(values.title) };
                if (editing && selectedProduct) {
                  const updatedProduct = { ...productWithSlug, id: selectedProduct.id };
                  updateData(updatedProduct);
                } else {
                  addData(productWithSlug);
                }
              }}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <Field
                    name="title"
                    as={Input}
                    placeholder="Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && !!errors.title}
                    mb={2}
                  />
                  <Field
                    name="price"
                    as={Input}
                    type="number"
                    placeholder="Price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.price && !!errors.price}
                    mb={2}
                  />
                  <Field
                    name="description"
                    as={Input}
                    placeholder="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.description && !!errors.description}
                    mb={2}
                  />
                  <Field
                    name="imgUrl"
                    as={Input}
                    placeholder="Image URL"
                    value={values.imgUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.imgUrl && !!errors.imgUrl}
                    mb={2}
                  />
                  <ModalFooter>
                    <Button type="submit" colorScheme="teal">
                      {editing ? "Update Product" : "Add Product"}
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
