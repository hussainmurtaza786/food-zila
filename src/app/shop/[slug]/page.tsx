"use client";

import { useEffect, useState } from "react";
import { Box, Text, Flex, Image, Button, Spinner, Badge, SimpleGrid } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/slices/customer/cartSlice";
import { Product } from "@/types/user";
import { oswald700 } from "@/lib/fonts";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`/api/products/${params.slug}`)
      .then((r) => r.json())
      .then((d) => { setProduct(d.product); setRelated(d.related || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <Flex justify="center" py={20}><Spinner size="xl" color="teal.500" /></Flex>;
  if (!product) return <Box textAlign="center" py={20}><Text fontSize="2xl">Product not found</Text></Box>;

  return (
    <Box>
      {/* Breadcrumb */}
      <Box bg="gray.50" py={4} px={{ base: 4, md: 8 }}>
        <Box maxW="1200px" mx="auto">
          <Flex align="center" gap={2} fontSize="sm" color="gray.500">
            <Link href="/shop"><Text _hover={{ color: "#00813d" }} cursor="pointer">Shop</Text></Link>
            <Text>/</Text>
            {product.category && (
              <>
                <Link href={`/shop?category=${product.category.slug}`}><Text _hover={{ color: "#00813d" }} cursor="pointer">{product.category.name}</Text></Link>
                <Text>/</Text>
              </>
            )}
            <Text color="gray.800" fontWeight="bold">{product.title}</Text>
          </Flex>
        </Box>
      </Box>

      {/* Product Detail */}
      <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
        <Button as={Link} href="/shop" variant="ghost" leftIcon={<FaArrowLeft />} mb={6} size="sm">
          Back to Menu
        </Button>

        <Flex direction={{ base: "column", md: "row" }} gap={10}>
          <Box flex="1">
            <Image
              src={product.imgUrl}
              alt={product.title}
              w="100%"
              maxH="500px"
              objectFit="cover"
              borderRadius="16px"
              boxShadow="lg"
            />
          </Box>

          <Box flex="1">
            {product.category && (
              <Badge colorScheme="teal" mb={3} px={3} py={1} borderRadius="full">
                {product.category.name}
              </Badge>
            )}
            <Text className={oswald700.className} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={4}>
              {product.title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="#00813d" mb={6}>
              Rs. {product.price.toLocaleString()}
            </Text>
            <Text color="gray.600" lineHeight="1.8" mb={8} fontSize="md">
              {product.description || "Delicious food prepared with the finest ingredients. Order now and enjoy a meal you won't forget."}
            </Text>

            {/* Quantity + Add to Cart */}
            <Flex align="center" gap={4} mb={6}>
              <Text fontWeight="bold">Quantity:</Text>
              <Flex align="center" border="1px solid gray.200" borderRadius="8px">
                <Button size="sm" variant="ghost" onClick={() => setQty(Math.max(1, qty - 1))}>-</Button>
                <Text fontWeight="bold" minW="40px" textAlign="center">{qty}</Text>
                <Button size="sm" variant="ghost" onClick={() => setQty(qty + 1)}>+</Button>
              </Flex>
            </Flex>

            <Button
              size="lg"
              colorScheme="teal"
              leftIcon={<FaShoppingCart />}
              w={{ base: "100%", md: "auto" }}
              px={10}
              h="56px"
              fontSize="lg"
              onClick={() => {
                for (let i = 0; i < qty; i++) {
                  dispatch(addToCart({
                    id: product.id,
                    slug: product.slug || "",
                    title: product.title,
                    price: product.price,
                    imgUrl: product.imgUrl || "",
                  }));
                }
              }}
            >
              Add to Cart - Rs. {(product.price * qty).toLocaleString()}
            </Button>
          </Box>
        </Flex>

        {/* Related Products */}
        {related.length > 0 && (
          <Box mt={16}>
            <Text className={oswald700.className} fontSize="2xl" fontWeight="bold" mb={6}>You Might Also Like</Text>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
              {related.map((item) => (
                <Link key={item.id} href={`/shop/${item.slug}`}>
                  <Box bg="white" borderRadius="12px" overflow="hidden" boxShadow="md" _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }} transition="all 0.3s">
                    <Image src={item.imgUrl} alt={item.title} w="100%" h="180px" objectFit="cover" />
                    <Box p={3}>
                      <Text fontWeight="bold" fontSize="sm">{item.title}</Text>
                      <Text color="#00813d" fontWeight="bold">Rs. {item.price.toLocaleString()}</Text>
                    </Box>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
