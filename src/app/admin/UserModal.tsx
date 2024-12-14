
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addUser, updateUser, type User } from "@/redux/slices/admin/userSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Type for a user


type UserModalProps = {
    isOpen: boolean;
    onClose: () => void;
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
    role: Yup.string(),
});

export default function UserModal({
    isOpen,
    onClose,
    editing,
    selectedUser,
}: UserModalProps) {
    const dispatch = useDispatch<AppDispatch>();

    const addData = async (values: Omit<User, "id"> & { password: string }) => {
        try {
            const newUser = await dispatch(addUser(values)).unwrap();
            if (newUser && newUser.id) {
                onClose(); // Close modal after adding
            } else {
                console.error("Failed to add user: Invalid user data", newUser);
            }
        } catch (err) {
            console.error("Failed to add user:", err);
        }
    };

    const updateData = async (values: User) => {
        try {
            const updatedUser = await dispatch(updateUser(values)).unwrap();
            console.log("updated", updateUser)
            if (updatedUser) {
                onClose(); // Close modal after updating
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
                            password: "",
                            role: selectedUser?.role || "",
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
                                    type="password"
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
}
