"use client";

import { useEffect, useState } from "react";
import { Box, Text, Flex, Image, Button, SimpleGrid, IconButton } from "@chakra-ui/react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/slices/customer/cartSlice";
import PageBanner from "@/components/common/PageBanner";
import { oswald700 } from "@/lib/fonts";
import Link from "next/link";

interface WishlistItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  addedAt: number;
}

function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("foodzilla-wishlist") || "[]"); } catch { return []; }
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem("foodzilla-wishlist", JSON.stringify(items));
  window.dispatchEvent(new Event("wishlist-updated"));
}

export default function WishlistPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => { setItems(getWishlist()); }, []);

  const removeItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveWishlist(updated);
  };

  const moveToCart = (item: WishlistItem) => {
    dispatch(addToCart({ id: item.id, slug: item.slug, title: item.title, price: item.price, imgUrl: item.imgUrl }));
    removeItem(item.id);
  };

  if (items.length === 0) {
    return (
      <Box>
        <PageBanner title="MY WISHLIST" />
        <Box minH="50vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={16}>
          <Text fontSize="6xl" mb={4}>💝</Text>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>Your wishlist is empty</Text>
          <Text color="gray.500" mb={6}>Save your favorite items here for later!</Text>
          <Button as={Link} href="/shop" colorScheme="teal" size="lg">Browse Menu</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <PageBanner title="MY WISHLIST" />
      <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Text className={oswald700.className} fontSize="2xl" fontWeight="bold">
            Saved Items ({items.length})
          </Text>
          <Button size="sm" variant="ghost" colorScheme="red" onClick={() => { setItems([]); saveWishlist([]); }}>
            Clear All
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {items.map((item) => (
            <Box key={item.id} bg="white" borderRadius="16px" overflow="hidden" boxShadow="md" _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Link href={`/shop/${item.slug}`}>
                <Image src={item.imgUrl} alt={item.title} w="100%" h="200px" objectFit="cover" />
              </Link>
              <Box p={4}>
                <Link href={`/shop/${item.slug}`}>
                  <Text fontWeight="bold" fontSize="lg" mb={1} _hover={{ color: "#00813d" }}>{item.title}</Text>
                </Link>
                <Text fontWeight="bold" fontSize="xl" color="#00813d" mb={4}>Rs. {item.price.toLocaleString()}</Text>
                <Flex gap={2}>
                  <Button size="sm" colorScheme="teal" leftIcon={<FaShoppingCart />} flex={1} onClick={() => moveToCart(item)}>
                    Add to Cart
                  </Button>
                  <IconButton aria-label="Remove" icon={<FaTrash />} size="sm" colorScheme="red" variant="outline" onClick={() => removeItem(item.id)} />
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
