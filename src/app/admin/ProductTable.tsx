"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Flex, Image, Button, Text,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  ModalFooter, Input, FormControl, FormLabel, Select, IconButton, useToast, Badge,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { oswald700, nunito } from "@/lib/fonts";
import { deleteProduct, updateProduct, addProduct } from "@/redux/slices/admin/productSlice";
import { Formik, Form, Field } from "formik";
import { productValidationSchema } from "@/lib/validations";
import { NewProduct, Product, Category } from "@/types/user";
import { FaImage, FaTrash } from "react-icons/fa";

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function ProductTable({ products: initialProducts }: { products: Product[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => {});
  }, []);

  const handleImageUpload = async (file: File, setFieldValue: (field: string, value: string) => void) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const r = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Upload failed");
      setFieldValue("imgUrl", d.url);
      toast({ title: "Image uploaded!", status: "success", duration: 2000 });
    } catch (e: unknown) {
      toast({ title: e instanceof Error ? e.message : "Upload failed", status: "error" });
    } finally {
      setUploading(false);
    }
  };

  const deleteData = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      setProducts(products.filter((p) => p.id !== id));
      toast({ title: "Product deleted", status: "info", duration: 2000 });
    } catch (err) {
      console.error("Failed to delete product:", err);
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

  const addData = async (values: NewProduct) => {
    try {
      const newProduct = await dispatch(addProduct(values)).unwrap();
      setProducts([{ ...newProduct, category: categories.find((c) => c.id === newProduct.categoryId) || null }, ...products]);
      onClose();
      toast({ title: "Product added!", status: "success", duration: 2000 });
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  const updateData = async (values: Product) => {
    try {
      const updatedProduct = await dispatch(updateProduct(values)).unwrap();
      setProducts(products.map((p) => (p.id === updatedProduct.id ? { ...updatedProduct, category: categories.find((c) => c.id === updatedProduct.categoryId) || null } : p)));
      onClose();
      toast({ title: "Product updated!", status: "success", duration: 2000 });
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  return (
    <Flex justify="center" align="start" h="100%">
      <Box w="100%" overflowX="auto" border="1px solid teal" p={4} borderRadius="md" boxShadow="xl" sx={{ fontFamily: nunito.style.fontFamily }}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text className={oswald700.className} fontSize="xl" fontWeight="bold">Products ({products.length})</Text>
          <Button colorScheme="teal" onClick={openAddModal}>Add Product</Button>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <Image borderRadius="8px" src={item.imgUrl} alt={item.title} maxWidth="80px" h="60px" objectFit="cover" />
                  </Td>
                  <Td fontWeight="bold">{item.title}</Td>
                  <Td>
                    {item.category ? (
                      <Badge colorScheme="teal" borderRadius="full">{item.category.name}</Badge>
                    ) : (
                      <Badge colorScheme="gray" borderRadius="full">Uncategorized</Badge>
                    )}
                  </Td>
                  <Td fontWeight="bold" color="green.600">Rs. {item.price.toLocaleString()}</Td>
                  <Td whiteSpace="normal" maxW="200px" fontSize="sm">{item.description}</Td>
                  <Td>
                    <Button size="xs" colorScheme="blue" onClick={() => openEditModal(item)} mr={1}>Edit</Button>
                    <Button size="xs" colorScheme="red" onClick={() => deleteData(item.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add / Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing ? "Edit Product" : "Add Product"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                title: selectedProduct?.title || "",
                price: selectedProduct?.price || 0,
                description: selectedProduct?.description || "",
                imgUrl: selectedProduct?.imgUrl || "",
                categoryId: selectedProduct?.categoryId || "",
              }}
              validationSchema={productValidationSchema}
              onSubmit={(values) => {
                const productWithSlug = { ...values, slug: generateSlug(values.title), categoryId: values.categoryId || undefined };
                if (editing && selectedProduct) {
                  updateData({ ...productWithSlug, id: selectedProduct.id });
                } else {
                  addData(productWithSlug);
                }
              }}
            >
              {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                <Form>
                  <Flex direction="column" gap={4}>
                    {/* Image Upload */}
                    <FormControl>
                      <FormLabel fontWeight="bold" fontSize="sm">Product Image</FormLabel>
                      {values.imgUrl ? (
                        <Box position="relative" display="inline-block">
                          <Image src={values.imgUrl} alt="Preview" maxH="180px" borderRadius="12px" boxShadow="md" />
                          <IconButton
                            aria-label="Remove image"
                            icon={<FaTrash />}
                            size="xs"
                            colorScheme="red"
                            position="absolute"
                            top={2}
                            right={2}
                            onClick={() => setFieldValue("imgUrl", "")}
                          />
                        </Box>
                      ) : (
                        <Box
                          border="2px dashed"
                          borderColor="gray.300"
                          borderRadius="12px"
                          p={8}
                          textAlign="center"
                          cursor="pointer"
                          _hover={{ borderColor: "teal.400", bg: "gray.50" }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FaImage size={32} color="gray.400" />
                          <Text mt={2} color="gray.500" fontSize="sm">
                            {uploading ? "Uploading..." : "Click to select image from PC"}
                          </Text>
                          <Text mt={1} color="gray.400" fontSize="xs">JPG, PNG, WEBP or GIF (max 5MB)</Text>
                        </Box>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, setFieldValue);
                          e.target.value = "";
                        }}
                      />
                    </FormControl>

                    {/* Or manual URL */}
                    {values.imgUrl && (
                      <FormControl>
                        <FormLabel fontWeight="bold" fontSize="sm">Or paste image URL</FormLabel>
                        <Field
                          name="imgUrl"
                          as={Input}
                          placeholder="https://example.com/image.jpg"
                          value={values.imgUrl}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    )}

                    {/* Title */}
                    <FormControl isInvalid={touched.title && !!errors.title}>
                      <FormLabel fontWeight="bold" fontSize="sm">Title</FormLabel>
                      <Field name="title" as={Input} placeholder="Product title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                    </FormControl>

                    {/* Price */}
                    <FormControl isInvalid={touched.price && !!errors.price}>
                      <FormLabel fontWeight="bold" fontSize="sm">Price (Rs.)</FormLabel>
                      <Field name="price" as={Input} type="number" placeholder="0" value={values.price} onChange={handleChange} onBlur={handleBlur} />
                    </FormControl>

                    {/* Category */}
                    <FormControl>
                      <FormLabel fontWeight="bold" fontSize="sm">Category</FormLabel>
                      <Select
                        placeholder="Select category..."
                        value={values.categoryId}
                        onChange={(e) => setFieldValue("categoryId", e.target.value || "")}
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Description */}
                    <FormControl isInvalid={touched.description && !!errors.description}>
                      <FormLabel fontWeight="bold" fontSize="sm">Description</FormLabel>
                      <Field name="description" as={Input} placeholder="Product description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                    </FormControl>
                  </Flex>

                  <ModalFooter px={0} mt={4}>
                    <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
                    <Button type="submit" colorScheme="teal" isLoading={uploading}>
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
