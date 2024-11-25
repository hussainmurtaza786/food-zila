import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export default function AdminPage() {
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

        {/* Login Form */}
        <Box as="form">
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <Button type="submit" colorScheme="teal" w="full" mt={4}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
