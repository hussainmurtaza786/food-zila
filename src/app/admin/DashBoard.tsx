import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Select,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import DashBoardTable from "./Table";

export default function DashBoard() {
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleShowTable = async () => {
    setLoading(true); // Show loading spinner
    setError(null); // Reset error state

    try {
      await fetchData(); // Simulate data fetching
      setShowTable(true); // Display the table
    } catch (err) {
      setError("Failed to load the data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const fetchData = async () => {
    // Simulated server-side data fetch
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        Math.random() > 0.2 ? resolve(true) : reject(new Error("Fetch failed"));
      }, 1000)
    );
  };

  return (
    <Box>
      <Flex direction={["column", "row"]} h="100vh">
        {/* Sidebar */}
        <Box
          bg="linear-gradient(135deg, #D1E8E2, #AEEEEE, #F5F5F5)"
          flex="1"
          p={8}
          boxShadow="xl"
        >
          <Heading fontSize="3xl" mb={6} color="teal.600">
            Dashboard
          </Heading>

          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={4}
            cursor="pointer"
            onClick={handleShowTable}
          >
            Product List
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            UI Components
          </Text>

          <Select
            border="1px solid #ccc"
            mb={4}
            placeholder="Select Element"
            _hover={{ borderColor: "teal.500" }}
          >
            <option value="option1">Option 1</option>
          </Select>
        </Box>

        {/* Main Content */}
        <Flex direction="column" flex="4">
          {/* Welcome Box */}
          <Box bgColor="blue.500" boxShadow="xl" p="5">
            <Text
              fontSize="5xl"
              color="white"
              fontWeight="bold"
              textAlign="center"
            >
              Welcome to the Dashboard
            </Text>
          </Box>

          {/* Table or Spinner */}
          <Box flex="1" p={8}>
            {loading ? (
              <Flex justify="center" align="center" h="100%">
                <Spinner color="teal.500" size="xl" />
              </Flex>
            ) : error ? (
              <Text textAlign="center" color="red.500">
                {error}
              </Text>
            ) : showTable ? (
              <DashBoardTable />
            ) : (
              <Text textAlign="center" color="gray.500">
                Click on "Product List" to load the table.
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
