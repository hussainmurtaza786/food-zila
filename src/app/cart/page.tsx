"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/slices/customer/cartSlice";
import { Box, Text, Image, Button, Flex, IconButton, Divider } from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import Link from "next/link";
import PageBanner from "@/components/common/PageBanner";
import { oswald700 } from "@/lib/fonts";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart);

  const deliveryFee = totalPrice > 2000 ? 0 : 150;
  const grandTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <Box>
        <PageBanner title="YOUR CART" />
        <Box minH="50vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={16}>
          <Text fontSize="6xl" mb={4}>🛒</Text>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>Your cart is empty</Text>
          <Text color="gray.500" mb={6}>Add some delicious food to get started!</Text>
          <Button as={Link} href="/shop" colorScheme="teal" size="lg">
            Browse Menu
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <PageBanner title="YOUR CART" />
      <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
        <Flex direction={{ base: "column", lg: "row" }} gap={8}>
          {/* Cart Items */}
          <Box flex="2">
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
              <Text className={oswald700.className} fontSize="2xl" fontWeight="bold">
                Cart Items ({totalItems})
              </Text>
              <Button size="sm" variant="ghost" colorScheme="red" leftIcon={<DeleteIcon />} onClick={() => dispatch(clearCart())}>
                Clear All
              </Button>
            </Flex>

            {items.map((item) => (
              <Flex key={item.id} align="center" gap={4} p={4} mb={4} bg="white" borderRadius="12px" boxShadow="md">
                <Image src={item.imgUrl} alt={item.title} w="80px" h="80px" objectFit="cover" borderRadius="8px" />
                <Box flex="1">
                  <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
                  <Text color="#00813d" fontWeight="bold">Rs. {item.price.toLocaleString()}</Text>
                </Box>
                <Flex align="center" gap={2}>
                  <IconButton
                    aria-label="decrease"
                    size="sm"
                    icon={<MinusIcon />}
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  />
                  <Text fontWeight="bold" minW="30px" textAlign="center">{item.quantity}</Text>
                  <IconButton
                    aria-label="increase"
                    size="sm"
                    icon={<AddIcon />}
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  />
                </Flex>
                <Text fontWeight="bold" minW="100px" textAlign="right">Rs. {(item.price * item.quantity).toLocaleString()}</Text>
                <IconButton
                  aria-label="remove"
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </Flex>
            ))}
          </Box>

          {/* Order Summary */}
          <Box flex="1">
            <Box bg="white" p={6} borderRadius="12px" boxShadow="md" position="sticky" top="100px">
              <Text className={oswald700.className} fontSize="xl" fontWeight="bold" mb={4}>
                Order Summary
              </Text>
              <Divider mb={4} />
              <Flex justify="space-between" mb={2}>
                <Text color="gray.600">Subtotal</Text>
                <Text fontWeight="bold">Rs. {totalPrice.toLocaleString()}</Text>
              </Flex>
              <Flex justify="space-between" mb={2}>
                <Text color="gray.600">Delivery Fee</Text>
                <Text fontWeight="bold" color={deliveryFee === 0 ? "green.500" : "inherit"}>
                  {deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}
                </Text>
              </Flex>
              {deliveryFee > 0 && (
                <Text fontSize="xs" color="gray.400" mb={2}>
                  Free delivery on orders above Rs. 2,000
                </Text>
              )}
              <Divider mb={4} />
              <Flex justify="space-between" mb={6}>
                <Text fontSize="lg" fontWeight="bold">Total</Text>
                <Text fontSize="lg" fontWeight="bold" color="#00813d">Rs. {grandTotal.toLocaleString()}</Text>
              </Flex>
              <Button as={Link} href="/checkout" w="100%" colorScheme="teal" size="lg">
                Proceed to Checkout
              </Button>
              <Button as={Link} href="/shop" w="100%" mt={3} variant="ghost" size="sm">
                Continue Shopping
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
