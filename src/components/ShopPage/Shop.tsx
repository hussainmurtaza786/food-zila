import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import { Oswald } from "@next/font/google";
import { headers } from "next/headers";

async function ProductList() {
  // headers().forEach((v, k) => console.log({ k, v }))
  // const response = await fetch(`/api/admin/products`, {
  const response = await fetch(`${headers().get('x-forwarded-proto')}://${headers().get('host')}/api/admin/products`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data.products;
}

type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};

const oswald = Oswald({ weight: "400", subsets: ["latin"] });

export default async function Shop() {
  const products = await ProductList();
  // console.log(products);
  return (
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4} p={4}>
      {products?.map((item: Product) => (
        <Grid
          key={item.id}
          textAlign="center"
          fontSize="25px"
          className={oswald.className}
          w="100%"
          h="600px"
          border="2px solid gray"
          p={4}
          borderRadius="12px"
          boxShadow="lg"
        >
          <Image
            borderRadius="12px"
            w="100%"
            h="300px"
            src={item.imgUrl}
            alt={item.title}
          />
          <Text fontWeight="bold" fontSize="30px" mt={2}>
            {item.title.toUpperCase()}
          </Text>
          <Text fontSize="20px" color="gray.500">
            ${item.price}
          </Text>
          <Text mt={2} noOfLines={2}>
            {item.description}
          </Text>
          <Button
            bgColor="blue.400"
            _hover={{ bgColor: "blue.500" }}
            w="100%"
            mt={4}
          >
            BUY NOW
          </Button>
        </Grid>
      ))}
    </Box>
  );
}
