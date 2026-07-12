"use client";

import { Box, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { oswald700 } from "@/lib/fonts";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <Box minH="50vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={16} px={4}>
      <Text fontSize="6xl" mb={4}>⚠️</Text>
      <Text className={oswald700.className} fontSize="2xl" fontWeight="bold" mb={2}>
        Something went wrong
      </Text>
      <Text color="gray.500" mb={6} textAlign="center" maxW="400px">
        {error.message || "An unexpected error occurred. Please try again."}
      </Text>
      <Button colorScheme="teal" onClick={reset}>
        Try Again
      </Button>
    </Box>
  );
}
