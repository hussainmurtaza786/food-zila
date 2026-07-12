import { Box, Heading, Text } from "@chakra-ui/react";
import { oswald700 } from "@/lib/fonts";
import { FaSearch, FaUtensils, FaMotorcycle } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch size={30} />,
    title: "Browse Menu",
    description: "Explore our wide range of cuisines and pick your favorites from the menu.",
  },
  {
    icon: <FaUtensils size={30} />,
    title: "Place Order",
    description: "Add items to your cart, choose delivery or pickup, and confirm your order.",
  },
  {
    icon: <FaMotorcycle size={30} />,
    title: "Fast Delivery",
    description: "Sit back and relax. We will deliver hot and fresh food right to your door.",
  },
];

export default function HowItWorks() {
  return (
    <Box py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }} maxW="1000px" mx="auto">
      <Box textAlign="center" mb={10}>
        <Text color="#00813d" fontWeight="bold" fontSize="sm" letterSpacing="3px" mb={2}>
          SIMPLE & EASY
        </Text>
        <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="gray.700">
          HOW IT <Text as="span" color="#00813d">WORKS</Text>
        </Heading>
      </Box>

      <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={{ base: 8, md: 6 }} position="relative">
        {steps.map((step, index) => (
          <Box key={index} flex="1" textAlign="center" position="relative">
            <Box
              w="70px"
              h="70px"
              borderRadius="full"
              bg="#00813d"
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mx="auto"
              mb={5}
              boxShadow="0 4px 15px rgba(0, 129, 61, 0.3)"
            >
              {step.icon}
            </Box>
            <Text
              fontWeight="bold"
              fontSize="xs"
              color="#00813d"
              mb={2}
              letterSpacing="2px"
            >
              STEP {index + 1}
            </Text>
            <Text className={oswald700.className} fontSize="xl" fontWeight="bold" mb={3} color="gray.800">
              {step.title}
            </Text>
            <Text color="gray.500" fontSize="sm" maxW="250px" mx="auto">
              {step.description}
            </Text>

            {index < steps.length - 1 && (
              <Box
                display={{ base: "none", md: "block" }}
                position="absolute"
                top="35px"
                right="-30px"
                w="60px"
                h="2px"
                bg="gray.300"
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
