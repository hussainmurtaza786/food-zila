"use client";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DashBoard from "./DashBoard";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated by validating the token in cookies
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      setIsAuthenticated(true); // Skip login if valid token is found
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("data ==>", data);

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store the token securely in cookies (HttpOnly cookie preferred)
      document.cookie = `authToken=${data.token}; path=/; max-age=86400`; // 1 day expiry

      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isAuthenticated) {
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
          Admin Login
        </Text>
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
            isLoading={isLoading}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
