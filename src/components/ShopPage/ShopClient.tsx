"use client";

import { useEffect, useState } from "react";
import { Box, Text, Flex, Input, Image, Button, Spinner, SimpleGrid, Badge } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/slices/customer/cartSlice";
import { Product, Category } from "@/types/user";
import PageBanner from "@/components/common/PageBanner";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";

function getWishlistIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const wl = JSON.parse(localStorage.getItem("foodzilla-wishlist") || "[]");
    return new Set(wl.map((i: { id: string }) => i.id));
  } catch { return new Set(); }
}

function toggleWishlist(product: Product) {
  const existing = JSON.parse(localStorage.getItem("foodzilla-wishlist") || "[]");
  const idx = existing.findIndex((i: { id: string }) => i.id === product.id);
  if (idx >= 0) {
    existing.splice(idx, 1);
  } else {
    existing.push({ id: product.id, slug: product.slug || "", title: product.title, price: product.price, imgUrl: product.imgUrl || "", addedAt: Date.now() });
  }
  localStorage.setItem("foodzilla-wishlist", JSON.stringify(existing));
  window.dispatchEvent(new Event("wishlist-updated"));
}

export default function ShopClient() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  const fetchProducts = (cat: string, q: string, p: number) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (cat !== "all") params.set("category", cat);
    if (q) params.set("search", q);
    params.set("page", p.toString());
    params.set("limit", "12");

    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((d) => { setProducts(d.products || []); setTotalPages(d.totalPages || 1); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(d.categories || []));
    fetchProducts("all", "", 1);
    setWishlistIds(getWishlistIds());
    const syncWishlist = () => setWishlistIds(getWishlistIds());
    window.addEventListener("wishlist-updated", syncWishlist);
    return () => window.removeEventListener("wishlist-updated", syncWishlist);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
    fetchProducts(cat, search, 1);
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
    fetchProducts(activeCategory, q, 1);
  };

  return (
    <Box>
      <PageBanner title="OUR MENU" />

      <Box maxW="1300px" mx="auto" p={{ base: 4, md: 8 }}>
        {/* Search */}
        <Flex mb={6} justify="center">
          <Box position="relative" w="100%" maxW="500px">
            <Input
              placeholder="Search food..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              pl={12}
              h="50px"
              borderRadius="25px"
              boxShadow="md"
              bg="white"
            />
            <Box position="absolute" left={4} top="50%" transform="translateY(-50%)">
              <FaSearch color="gray.400" />
            </Box>
          </Box>
        </Flex>

        {/* Category Tabs */}
        <Flex mb={8} gap={3} overflowX="auto" pb={2} justify="center" flexWrap="wrap">
          <Button
            size="sm"
            borderRadius="20px"
            variant={activeCategory === "all" ? "solid" : "outline"}
            colorScheme="teal"
            onClick={() => handleCategoryChange("all")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              size="sm"
              borderRadius="20px"
              variant={activeCategory === cat.slug ? "solid" : "outline"}
              colorScheme="teal"
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </Flex>

        {/* Products Grid */}
        {loading ? (
          <Flex justify="center" py={16}><Spinner size="xl" color="teal.500" /></Flex>
        ) : products.length === 0 ? (
          <Box textAlign="center" py={16}>
            <Text fontSize="5xl" mb={4}>🔍</Text>
            <Text fontSize="xl" fontWeight="bold" mb={2}>No products found</Text>
            <Text color="gray.500">Try a different search or category</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {products.map((product) => (
              <Box key={product.id} bg="white" borderRadius="16px" overflow="hidden" boxShadow="md" _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }} transition="all 0.3s">
                <Box position="relative">
                  <Link href={`/shop/${product.slug}`}>
                    <Image src={product.imgUrl} alt={product.title} w="100%" h="220px" objectFit="cover" />
                  </Link>
                  {product.category && (
                    <Badge position="absolute" top={3} left={3} colorScheme="teal" borderRadius="full" px={3} py={1} fontSize="xs">
                      {product.category.name}
                    </Badge>
                  )}
                  <Box
                    position="absolute" top={3} right={3}
                    bg="white" w="34px" h="34px" borderRadius="50%"
                    display="flex" alignItems="center" justifyContent="center"
                    cursor="pointer" boxShadow="md"
                    onClick={() => { toggleWishlist(product); setWishlistIds(getWishlistIds()); }}
                    _hover={{ transform: "scale(1.1)" }}
                    transition="all 0.2s"
                  >
                    <FaHeart size={16} color={wishlistIds.has(product.id) ? "#e53e3e" : "#cbd5e0"} />
                  </Box>
                </Box>
                <Box p={4}>
                  <Link href={`/shop/${product.slug}`}>
                    <Text fontWeight="bold" fontSize="lg" mb={1} _hover={{ color: "#00813d" }}>
                      {product.title}
                    </Text>
                  </Link>
                  <Text color="gray.500" fontSize="sm" mb={3} noOfLines={2}>
                    {product.description}
                  </Text>
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" fontSize="xl" color="#00813d">
                      Rs. {product.price.toLocaleString()}
                    </Text>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      leftIcon={<FaShoppingCart />}
                      onClick={() => {
                        dispatch(addToCart({
                          id: product.id,
                          slug: product.slug || "",
                          title: product.title,
                          price: product.price,
                          imgUrl: product.imgUrl || "",
                        }));
                      }}
                    >
                      Add
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Flex justify="center" mt={8} gap={2}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={p === page ? "solid" : "outline"}
                colorScheme="teal"
                onClick={() => { setPage(p); fetchProducts(activeCategory, search, p); }}
              >
                {p}
              </Button>
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
}
