"use client";

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
import DashBoardTable from "./DashBoardTable";
import { Oswald, Patrick_Hand, Merriweather } from '@next/font/google';
const oswald = Oswald({ weight: "700", subsets: ["latin-ext"] });

const patrick_hand = Patrick_Hand({ weight: "400", subsets: ['latin-ext'] });
const merriweather = Merriweather({ weight: "700", subsets: ['latin'] })
type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};

export default function DashBoard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleShowTable = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/admin/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
      setShowTable(true);
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
      setLoading(false);
    }
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
          <Text className={patrick_hand.className} fontSize="5xl" mb={6} color="teal.600">
            Dashboard
          </Text>

          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={4}
            cursor="pointer"
            onClick={handleShowTable}
            className={oswald.className}
          >
            Product List
          </Text>
          <Text className={merriweather.className} fontSize="2xl" fontWeight="bold" mb={4}>
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
              className={patrick_hand.className}
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
              <DashBoardTable products={products} />
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
