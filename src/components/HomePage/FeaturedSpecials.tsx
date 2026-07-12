"use client";

import { Box, Button, Heading, Text, Badge } from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import Link from "next/link";
import { ProductDTO } from "@/types/user";

export default function FeaturedSpecials({ products }: { products: ProductDTO[] }) {
  if (!products.length) return null;

  return (
    <Box py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <Box textAlign="center" mb={10}>
        <Text color="#00813d" fontWeight="bold" fontSize="sm" letterSpacing="3px" mb={2}>
          FROM OUR MENU
        </Text>
        <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="gray.700">
          OUR <Text as="span" color="#00813d">SPECIAL</Text> PICKS
        </Heading>
        <Text color="gray.500" mt={3} maxW="500px" mx="auto" fontSize={{ base: "sm", md: "md" }}>
          Handpicked favorites our customers can not stop ordering. Try them today!
        </Text>
      </Box>

      <Box display="grid" gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
        {products.map((product) => (
          <Box
            key={product.id}
            as={Link}
            href={`/shop/${product.slug}`}
            bg="white"
            borderRadius="16px"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s ease"
            _hover={{ transform: "translateY(-6px)", boxShadow: "xl" }}
            display="flex"
            flexDirection="column"
          >
            <Box position="relative" overflow="hidden" h="200px">
              <Box
                as="img"
                src={product.imgUrl || "/assets/burger.png"}
                alt={product.title}
                w="100%"
                h="100%"
                objectFit="cover"
                transition="transform 0.4s ease"
                _hover={{ transform: "scale(1.08)" }}
              />
              {product.isFeatured && (
                <Badge
                  position="absolute"
                  top={3}
                  right={3}
                  bg="#00813d"
                  color="white"
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  FEATURED
                </Badge>
              )}
              {product.category && (
                <Badge
                  position="absolute"
                  bottom={3}
                  left={3}
                  bg="white"
                  color="gray.700"
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                >
                  {product.category.name}
                </Badge>
              )}
            </Box>

            <Box p={4} flex="1" display="flex" flexDirection="column" justifyContent="space-between">
              <Box>
                <Text fontWeight="bold" fontSize="md" mb={1} noOfLines={1} color="gray.800">
                  {product.title}
                </Text>
                <Text color="gray.500" fontSize="xs" noOfLines={2} mb={3}>
                  {product.description}
                </Text>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold" fontSize="lg" color="#00813d">
                  Rs. {product.price.toLocaleString()}
                </Text>
                <Button
                  size="xs"
                  colorScheme="teal"
                  leftIcon={<MdLocalShipping size={14} />}
                  borderRadius="full"
                  px={3}
                >
                  Order
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box textAlign="center" mt={10}>
        <Button
          as={Link}
          href="/shop"
          colorScheme="teal"
          size="lg"
          leftIcon={<MdLocalShipping size={18} />}
          px={10}
          borderRadius="full"
        >
          VIEW FULL MENU
        </Button>
      </Box>
    </Box>
  );
}
