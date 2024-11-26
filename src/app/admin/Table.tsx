// Server Component
import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};

// This will now be your main DashboardTable Component
export default async function DashBoardTable() {
  const response = await fetch("http://localhost:3000/api/admin/products", {
    cache: "no-cache",
  });
  const data = await response.json();
  const products: Product[] = data.products;
  console.log("Products array", products);

  return (
    <Box>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Product List</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Description</Th>
              <Th>Image Url</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((item: Product) => (
              <Tr key={item.id}>
                <Td>{item.title}</Td>
                <Td>{item.price}</Td>
                <Td>{item.description}</Td>
                <Td>{item.imgUrl}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
