import { Box } from "@chakra-ui/react";
import { ProductGridSkeleton } from "@/components/common/Skeletons";

export default function ShopLoading() {
  return (
    <Box maxW="1300px" mx="auto" p={{ base: 4, md: 8 }}>
      <ProductGridSkeleton count={8} />
    </Box>
  );
}
