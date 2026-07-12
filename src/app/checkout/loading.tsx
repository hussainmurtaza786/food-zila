import { Box, Flex, Skeleton } from "@chakra-ui/react";

export default function CheckoutLoading() {
  return (
    <Box maxW="1000px" mx="auto" p={{ base: 4, md: 8 }}>
      <Flex direction={{ base: "column", lg: "row" }} gap={8}>
        <Box flex="2">
          <Skeleton height="24px" width="200px" mb={6} />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="52px" mb={4} borderRadius="8px" />
          ))}
        </Box>
        <Box flex="1">
          <Skeleton height="350px" borderRadius="12px" />
        </Box>
      </Flex>
    </Box>
  );
}
