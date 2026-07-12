"use client";

import { Box, Text, SimpleGrid, Icon, Flex } from "@chakra-ui/react";
import PageBanner from "@/components/common/PageBanner";
import { oswald700 } from "@/lib/fonts";
import { FaTruck, FaShieldAlt, FaConciergeBell, FaPercentage, FaClock, FaHeadset } from "react-icons/fa";

const services = [
  { icon: FaTruck, title: "Fast Delivery", desc: "Get your food delivered hot and fresh within 30 minutes or less. Our riders are always on time." },
  { icon: FaShieldAlt, title: "Secure Payment", desc: "Pay with confidence using our secure payment system. Multiple payment options available." },
  { icon: FaConciergeBell, title: "Quality Food", desc: "We use only the freshest ingredients sourced from local farms to prepare your meals." },
  { icon: FaPercentage, title: "Best Deals", desc: "Enjoy exclusive discounts, combo offers, and loyalty rewards every time you order." },
  { icon: FaClock, title: "24/7 Available", desc: "Craving food at 3 AM? We've got you covered. Order anytime, day or night." },
  { icon: FaHeadset, title: "Live Support", desc: "Got questions? Our friendly support team is just a call or chat away to help you out." },
];

export default function ServicesPage() {
  return (
    <Box>
      <PageBanner title="OUR SERVICES" />
      <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        <Box textAlign="center" mb={12}>
          <Text fontSize="sm" color="#00813d" fontWeight="bold" mb={2}>WHAT WE OFFER</Text>
          <Text className={oswald700.className} fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            Why Choose FoodZila?
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {services.map((s) => (
            <Box key={s.title} bg="white" p={8} borderRadius="16px" boxShadow="md" textAlign="center" _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Flex justify="center" mb={4}>
                <Box bg="#e6f7ed" w="70px" h="70px" borderRadius="50%" display="flex" alignItems="center" justifyContent="center">
                  <Icon as={s.icon} boxSize={7} color="#00813d" />
                </Box>
              </Flex>
              <Text fontWeight="bold" fontSize="xl" mb={3}>{s.title}</Text>
              <Text color="gray.500" lineHeight="1.8">{s.desc}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
