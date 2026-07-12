import { Box, Flex, Skeleton } from "@chakra-ui/react";

export default function CartLoading() {
  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
      <Flex direction={{ base: "column", lg: "row" }} gap={8}>
        <Box flex="2">
          <Skeleton height="28px" width="180px" mb={6} />
          {[1, 2, 3].map((i) => (
            <Flex key={i} align="center" gap={4} p={4} mb={4} bg="white" borderRadius="12px" boxShadow="md">
              <Skeleton w="80px" h="80px" borderRadius="8px" />
              <Box flex="1"><Skeleton height="18px" mb={2} /><Skeleton height="16px" width="60px" /></Box>
              <Skeleton h="32px" w="100px" borderRadius="8px" />
            </Flex>
          ))}
        </Box>
        <Box flex="1">
          <Skeleton height="300px" borderRadius="12px" />
        </Box>
      </Flex>
    </Box>
  );
}
