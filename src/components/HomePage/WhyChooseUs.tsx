import { Box, Heading, Text } from "@chakra-ui/react";
import { oswald700 } from "@/lib/fonts";
import { FaLeaf, FaClock, FaStar, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf size={28} />,
    title: "Fresh Ingredients",
    description: "We use only the freshest, locally sourced ingredients in every dish we prepare.",
  },
  {
    icon: <FaClock size={28} />,
    title: "30 Min Delivery",
    description: "Hot and fresh food delivered to your doorstep in 30 minutes or less.",
  },
  {
    icon: <FaStar size={28} />,
    title: "Top Rated",
    description: "Rated 4.8 by thousands of happy customers. Quality you can trust.",
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: "Safe & Hygienic",
    description: "Every order is prepared in a fully sanitized, FSA-certified kitchen.",
  },
];

export default function WhyChooseUs() {
  return (
    <Box py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }} bgColor="#00813d">
      <Box maxW="1100px" mx="auto">
        <Box textAlign="center" mb={10}>
          <Text color="whiteAlpha.700" fontWeight="bold" fontSize="sm" letterSpacing="3px" mb={2}>
            WHY US
          </Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="white">
            WHY CHOOSE <Text as="span" color="#ffb936">FOODZILA</Text>?
          </Heading>
        </Box>

        <Box display="grid" gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
          {features.map((feature, index) => (
            <Box
              key={index}
              bg="whiteAlpha.100"
              borderRadius="16px"
              p={6}
              textAlign="center"
              transition="all 0.3s ease"
              _hover={{ bg: "whiteAlpha.200", transform: "translateY(-4px)" }}
            >
              <Box
                w="60px"
                h="60px"
                borderRadius="full"
                bg="#ffb936"
                color="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mx="auto"
                mb={4}
              >
                {feature.icon}
              </Box>
              <Text className={oswald700.className} fontWeight="bold" fontSize="lg" color="white" mb={3}>
                {feature.title}
              </Text>
              <Text color="whiteAlpha.800" fontSize="sm">
                {feature.description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
