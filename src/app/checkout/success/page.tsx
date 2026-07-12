"use client";

import { Box, Text, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import PageBanner from "@/components/common/PageBanner";
import { patrickHand, oswald700 } from "@/lib/fonts";

export default function CheckoutSuccessPage() {
  return (
    <Box>
      <PageBanner title="ORDER CONFIRMED" />
      <Box minH="60vh" display="flex" justifyContent="center" alignItems="center" py={16} px={4}>
        <Box bg="white" p={10} borderRadius="16px" boxShadow="xl" textAlign="center" maxW="500px">
          <Text fontSize="7xl" mb={4}>🎉</Text>
          <Text className={patrickHand.className} fontSize="3xl" color="#00813d" mb={2}>
            Thank You!
          </Text>
          <Text className={oswald700.className} fontSize="2xl" fontWeight="bold" mb={4}>
            Your order has been placed!
          </Text>
          <Text color="gray.500" mb={2}>
            We&apos;re preparing your food with love.
          </Text>
          <Text color="gray.500" mb={6}>
            Estimated delivery: <Text as="span" fontWeight="bold" color="#00813d">30-45 minutes</Text>
          </Text>
          <Flex gap={4} direction={{ base: "column", sm: "row" }} justify="center">
            <Button as={Link} href="/orders" colorScheme="teal">
              View My Orders
            </Button>
            <Button as={Link} href="/shop" variant="outline" colorScheme="teal">
              Continue Shopping
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
