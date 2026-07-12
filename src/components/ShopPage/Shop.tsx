import { ProductList } from "@/lib/product";
import { Product } from "@/types/user";
import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import { oswald400 } from "@/lib/fonts";

export const dynamic = "force-dynamic";

export default async function Shop() {
  const products = await ProductList();

  return (
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4} p={4}>
      {products?.map((item: Product) => (
        <Grid
          key={item.id}
          textAlign="center"
          fontSize="25px"
          className={oswald400.className}
          w="100%"
          h="600px"
          border="2px solid gray"
          p={4}
          borderRadius="12px"
          boxShadow="lg"
        >
          <Image borderRadius="12px" w="100%" h="300px" src={item.imgUrl} alt={item.title} />
          <Text fontWeight="bold" fontSize="30px" mt={2}>
            {item.title.toUpperCase()}
          </Text>
          <Text fontSize="20px" color="gray.500">
            {item.price}PKR
          </Text>
          <Text mt={2} noOfLines={2}>
            {item.description}
          </Text>
          <Button bgColor="blue.400" _hover={{ bgColor: "blue.500" }} w="100%" mt={4}>
            BUY NOW
          </Button>
        </Grid>
      ))}
    </Box>
  );
}
