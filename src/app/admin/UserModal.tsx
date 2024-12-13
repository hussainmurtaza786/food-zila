import React, { useState, } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { User } from "./UserTable";
import { updateUser } from "@/redux/slices/admin/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

type UserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: User) => void;
    editing: boolean;
    selectedUser: User | null;
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
const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, editing, selectedUser, }) => {

    const [users, setUsers] = useState<User[]>();

    const dispatch = useDispatch<AppDispatch>();
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

    return (
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
    );
};

export default UserModal;
