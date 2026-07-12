"use client";

import { Box, Skeleton, SkeletonText, SimpleGrid, Flex } from "@chakra-ui/react";

export function ProductCardSkeleton() {
  return (
    <Box bg="white" borderRadius="16px" overflow="hidden" boxShadow="md">
      <Skeleton height="220px" />
      <Box p={4}>
        <Skeleton height="20px" mb={2} />
        <SkeletonText noOfLines={2} spacing="4" mb={3} />
        <Flex justify="space-between">
          <Skeleton height="24px" width="80px" />
          <Skeleton height="32px" width="60px" borderRadius="8px" />
        </Flex>
      </Box>
    </Box>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </SimpleGrid>
  );
}

export function CartItemSkeleton() {
  return (
    <Flex align="center" gap={4} p={4} mb={4} bg="white" borderRadius="12px" boxShadow="md">
      <Skeleton w="80px" h="80px" borderRadius="8px" />
      <Box flex="1">
        <Skeleton height="18px" mb={2} />
        <Skeleton height="16px" width="60px" />
      </Box>
      <Skeleton h="32px" w="100px" borderRadius="8px" />
    </Flex>
  );
}

export function OrderCardSkeleton() {
  return (
    <Box bg="white" p={6} borderRadius="12px" boxShadow="md" mb={4}>
      <Flex justify="space-between" mb={3}>
        <Skeleton height="20px" width="120px" />
        <Skeleton height="20px" width="80px" />
      </Flex>
      <SkeletonText noOfLines={2} spacing="4" />
    </Box>
  );
}

export function PageSkeleton() {
  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
      <Skeleton height="40px" width="200px" mb={8} />
      <ProductGridSkeleton />
    </Box>
  );
}
