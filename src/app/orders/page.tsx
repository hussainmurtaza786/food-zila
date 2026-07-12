"use client";

import { useEffect, useState } from "react";
import { Box, Text, Flex, Spinner, Badge, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Order } from "@/types/user";
import PageBanner from "@/components/common/PageBanner";
import { oswald700 } from "@/lib/fonts";

const statusColors: Record<string, string> = {
  PENDING: "yellow",
  CONFIRMED: "blue",
  PREPARING: "orange",
  OUT_FOR_DELIVERY: "purple",
  DELIVERED: "green",
  CANCELLED: "red",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrdersPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch("/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("foodzilla-auth-token")}` },
    })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Box>
        <PageBanner title="MY ORDERS" />
        <Box minH="50vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={16}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Please login to view your orders</Text>
          <Button as={Link} href="/auth/login" colorScheme="teal">Sign In</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <PageBanner title="MY ORDERS" />
      <Box maxW="900px" mx="auto" p={{ base: 4, md: 8 }}>
        <Text className={oswald700.className} fontSize="2xl" fontWeight="bold" mb={6}>My Orders</Text>

        {loading ? (
          <Flex justify="center" py={16}><Spinner size="xl" color="teal.500" /></Flex>
        ) : orders.length === 0 ? (
          <Box textAlign="center" py={16}>
            <Text fontSize="5xl" mb={4}>📦</Text>
            <Text fontSize="xl" fontWeight="bold" mb={2}>No orders yet</Text>
            <Text color="gray.500" mb={6}>Start ordering some delicious food!</Text>
            <Button as={Link} href="/shop" colorScheme="teal">Browse Menu</Button>
          </Box>
        ) : (
          <Flex direction="column" gap={4}>
            {orders.map((order) => (
              <Box key={order.id} bg="white" p={6} borderRadius="12px" boxShadow="md">
                <Flex justify="space-between" align="center" mb={3} wrap="wrap" gap={2}>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm" color="gray.500">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </Text>
                  </Box>
                  <Badge colorScheme={statusColors[order.status]} px={3} py={1} borderRadius="full" fontSize="sm">
                    {statusLabels[order.status]}
                  </Badge>
                </Flex>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  {order.items?.length || 0} item(s) - Rs. {order.total.toLocaleString()}
                </Text>
                <Flex gap={2} mt={3}>
                  <Button as={Link} href={`/orders/${order.id}`} size="sm" colorScheme="teal" variant="outline">
                    View Details
                  </Button>
                </Flex>
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
}
