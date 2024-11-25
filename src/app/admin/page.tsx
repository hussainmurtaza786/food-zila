'use client';

import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { adminLoginThunk } from "../../redux/slices/admin/adminSlice"; // Adjust the path if necessary
import { AppDispatch, RootState } from "../../redux/store"; // Adjust the path if necessary
import DashBoard from "./DashBoard";

export default function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticating, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(adminLoginThunk({ email, password }));
  };

  if (!isAuthenticated) {
    return <DashBoard />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
        w="sm"
      >
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Access Restricted
        </Text>
        <Text mb={6}>Please provide your email and password to continue.</Text>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            w="full"
            mt={4}
            isLoading={isAuthenticating}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
