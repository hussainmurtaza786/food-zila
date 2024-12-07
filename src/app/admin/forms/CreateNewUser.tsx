import React, { useState } from "react";
import {
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
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type CreateNewUserProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateNewUser: React.FC<CreateNewUserProps> = ({ isOpen, onClose }) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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

                onClose();
                toast({
                  title: "Account Created",
                  description: "Subordinate account has been created.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
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
                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                  >
                    Create Account
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateNewUser;
