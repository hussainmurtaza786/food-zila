"use client";

import { Box, Text, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import PageBanner from "@/components/common/PageBanner";
import { oswald700 } from "@/lib/fonts";
import { FaStar } from "react-icons/fa";

const testimonials = [
  { name: "Ali Raza", rating: 5, text: "Best food delivery service in town! The burgers are always fresh and delivered hot. Highly recommend FoodZila to everyone.", role: "Regular Customer" },
  { name: "Sana Ahmed", rating: 5, text: "The biryani is absolutely amazing. I've tried many food delivery apps but FoodZila has the best quality and taste.", role: "Food Blogger" },
  { name: "Usman Tariq", rating: 5, text: "Quick delivery and excellent customer service. The pizza was delicious and arrived even before the estimated time!", role: "Business Owner" },
  { name: "Ayesha Khan", rating: 4, text: "Love the variety on the menu. There's something for everyone. The dessert menu is particularly impressive.", role: "Student" },
  { name: "Bilal Malik", rating: 5, text: "FoodZila has become my go-to for family dinners. The portions are generous and the prices are very reasonable.", role: "Father of Three" },
  { name: "Hira Javed", rating: 5, text: "The app is so easy to use and the food quality is consistently great. The sushi platter was a pleasant surprise!", role: "Fitness Enthusiast" },
];

function Stars({ count }: { count: number }) {
  return (
    <Flex gap={1} mb={3}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} as={FaStar} color={i < count ? "yellow.400" : "gray.300"} />
      ))}
    </Flex>
  );
}

export default function TestimonialsPage() {
  return (
    <Box>
      <PageBanner title="TESTIMONIALS" />
      <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        <Box textAlign="center" mb={12}>
          <Text fontSize="sm" color="#00813d" fontWeight="bold" mb={2}>WHAT PEOPLE SAY</Text>
          <Text className={oswald700.className} fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            Our Happy Customers
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {testimonials.map((t) => (
            <Box key={t.name} bg="white" p={8} borderRadius="16px" boxShadow="md" position="relative" _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Text fontSize="4xl" color="#00813d" opacity="0.2" position="absolute" top={4} right={6} fontWeight="bold">&ldquo;</Text>
              <Stars count={t.rating} />
              <Text color="gray.600" lineHeight="1.8" mb={6} fontSize="sm" fontStyle="italic">
                &ldquo;{t.text}&rdquo;
              </Text>
              <Flex align="center" gap={3}>
                <Box bg="#e6f7ed" w="48px" h="48px" borderRadius="50%" display="flex" alignItems="center" justifyContent="center" fontWeight="bold" color="#00813d" fontSize="lg">
                  {t.name.charAt(0)}
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="sm">{t.name}</Text>
                  <Text color="gray.400" fontSize="xs">{t.role}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
