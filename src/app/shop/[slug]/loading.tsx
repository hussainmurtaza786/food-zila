import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function ProductDetailLoading() {
  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
      <Skeleton height="20px" width="100px" mb={6} />
      <Flex direction={{ base: "column", md: "row" }} gap={10}>
        <Skeleton flex="1" height="400px" borderRadius="16px" />
        <Box flex="1">
          <Skeleton height="24px" width="100px" mb={4} />
          <Skeleton height="36px" width="60%" mb={4} />
          <Skeleton height="32px" width="120px" mb={4} />
          <SkeletonText noOfLines={4} spacing="4" mb={6} />
          <Skeleton height="48px" width="250px" borderRadius="8px" />
        </Box>
      </Flex>
    </Box>
  );
}
