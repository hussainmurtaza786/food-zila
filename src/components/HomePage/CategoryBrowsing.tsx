"use client";

import { Box, Heading, Text, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { Category } from "@/types/user";

const CATEGORY_IMAGES: Record<string, string> = {
  burgers: "https://www.eatingonadime.com/wp-content/uploads/2024/03/200KB-Zinger-Burger-8-500x375.jpg",
  pizza: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfQ0tzPeO9zwKIY1JzuB2yWtUcecQd8m8C4gmjioiDJr0CIzgW-9BONNU&s=10",
  "biryani-rice": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTLETHygJZ1iGyBd7EUjwLwTLqVqBbWrtHBL1FpyvRz9j4_4aXa0_CbLs&s=10",
  asian: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3v9F1IqNCnwAnWKrsB-JYxYkFcJdHL7ItJa76Ls2IcXiO73BytLxWz7Q6&s=10",
  "sides-snacks": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9_iDTnuiSOsC7pEquHrORqJi34rnDmoR4_hb4AK3S0SjCs1vhlIGOF7qr&s=10",
  desserts: "https://images.getrecipekit.com/20250325120225-how-20to-20make-20chocolate-20molten-20lava-20cake-20in-20the-20microwave.png?width=650&quality=90&",
};

const CATEGORY_COLORS: Record<string, string> = {
  burgers: "#FF6B35",
  pizza: "#E63946",
  "biryani-rice": "#F4A261",
  asian: "#2A9D8F",
  "sides-snacks": "#E9C46A",
  desserts: "#D62828",
};

export default function CategoryBrowsing({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;

  return (
    <Box py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }} bgColor="gray.50">
      <Box maxW="1200px" mx="auto">
        <Box textAlign="center" mb={10}>
          <Text color="#00813d" fontWeight="bold" fontSize="sm" letterSpacing="3px" mb={2}>
            EXPLORE
          </Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="gray.700">
            BROWSE BY <Text as="span" color="#00813d">CATEGORY</Text>
          </Heading>
          <Text color="gray.500" mt={3} maxW="450px" mx="auto" fontSize={{ base: "sm", md: "md" }}>
            Find exactly what you are craving. Tap a category to explore.
          </Text>
        </Box>

        <Box display="grid" gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={5}>
          {categories.map((cat) => {
            const imgSrc = CATEGORY_IMAGES[cat.slug] || "/assets/burger.png";
            const accentColor = CATEGORY_COLORS[cat.slug] || "#00813d";

            return (
              <Box
                key={cat.id}
                as={Link}
                href={`/shop?category=${cat.slug}`}
                position="relative"
                borderRadius="16px"
                overflow="hidden"
                h={{ base: "160px", md: "200px" }}
                transition="all 0.3s ease"
                _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
              >
                <Box
                  as="img"
                  src={imgSrc}
                  alt={cat.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  filter="brightness(0.55)"
                  transition="transform 0.4s ease"
                  _hover={{ transform: "scale(1.08)" }}
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg={`linear-gradient(transparent, ${accentColor}dd)`}
                  p={{ base: 4, md: 5 }}
                >
                  <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} color="white">
                    {cat.name}
                  </Text>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Text color="whiteAlpha.800" fontSize="xs">
                      {cat.description}
                    </Text>
                    <Badge bg="white" color={accentColor} px={2} py={0.5} borderRadius="full" fontSize="xs" fontWeight="bold">
                      {cat._count?.products || 0} items
                    </Badge>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
