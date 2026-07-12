"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, Flex, Spinner, Badge, Image, Divider } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Order } from "@/types/user";
import PageBanner from "@/components/common/PageBanner";
import { oswald700 } from "@/lib/fonts";

const statusColors: Record<string, string> = {
  PENDING: "yellow", CONFIRMED: "blue", PREPARING: "orange",
  OUT_FOR_DELIVERY: "purple", DELIVERED: "green", CANCELLED: "red",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending", CONFIRMED: "Confirmed", PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for Delivery", DELIVERED: "Delivered", CANCELLED: "Cancelled",
};

const statusSteps = ["PENDING", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login"); return; }
    fetch(`/api/orders/${params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("foodzilla-auth-token")}` },
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => setOrder(d.order))
      .catch(() => router.push("/orders"))
      .finally(() => setLoading(false));
  }, [isAuthenticated, params.id, router]);

  if (loading) return <Flex justify="center" py={16}><Spinner size="xl" color="teal.500" /></Flex>;
  if (!order) return null;

  const currentStep = statusSteps.indexOf(order.status);

  return (
    <Box>
      <PageBanner title="ORDER DETAILS" />
      <Box maxW="800px" mx="auto" p={{ base: 4, md: 8 }}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={2}>
          <Box>
            <Text fontWeight="bold" color="gray.500">Order #{order.id.slice(-8).toUpperCase()}</Text>
            <Text fontSize="sm" color="gray.400">
              {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </Text>
          </Box>
          <Badge colorScheme={statusColors[order.status]} px={4} py={2} borderRadius="full" fontSize="md">
            {statusLabels[order.status]}
          </Badge>
        </Flex>

        {/* Status Timeline */}
        {order.status !== "CANCELLED" && (
          <Box bg="white" p={6} borderRadius="12px" boxShadow="md" mb={6}>
            <Text className={oswald700.className} fontWeight="bold" mb={4}>Order Progress</Text>
            <Flex justify="space-between" position="relative">
              <Box position="absolute" top="16px" left="0" right="0" h="2px" bg="gray.200" zIndex={0} />
              <Box position="absolute" top="16px" left="0" h="2px" bg="teal.500" zIndex={1} w={`${Math.max(0, currentStep) * 25}%`} transition="width 0.5s" />
              {statusSteps.map((step, i) => (
                <Box key={step} textAlign="center" zIndex={2} flex="1">
                  <Box w="32px" h="32px" borderRadius="full" bg={i <= currentStep ? "teal.500" : "gray.200"} color="white" display="flex" justifyContent="center" alignItems="center" mx="auto" fontWeight="bold" fontSize="sm">
                    {i <= currentStep ? "✓" : i + 1}
                  </Box>
                  <Text fontSize="xs" mt={2} fontWeight={i <= currentStep ? "bold" : "normal"} color={i <= currentStep ? "teal.600" : "gray.400"}>
                    {statusLabels[step]}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        )}

        {/* Items */}
        <Box bg="white" p={6} borderRadius="12px" boxShadow="md" mb={6}>
          <Text className={oswald700.className} fontWeight="bold" mb={4}>Items</Text>
          {order.items?.map((item) => (
            <Flex key={item.id} align="center" gap={4} mb={3} pb={3} borderBottom="1px solid gray.100">
              <Image src={item.product?.imgUrl} alt={item.product?.title} w="60px" h="60px" objectFit="cover" borderRadius="8px" />
              <Box flex="1">
                <Text fontWeight="bold">{item.product?.title}</Text>
                <Text fontSize="sm" color="gray.500">Qty: {item.quantity} x Rs. {item.price.toLocaleString()}</Text>
              </Box>
              <Text fontWeight="bold">Rs. {(item.price * item.quantity).toLocaleString()}</Text>
            </Flex>
          ))}
          <Divider my={4} />
          <Flex justify="space-between">
            <Text fontWeight="bold" fontSize="lg">Total</Text>
            <Text fontWeight="bold" fontSize="lg" color="#00813d">Rs. {order.total.toLocaleString()}</Text>
          </Flex>
        </Box>

        {/* Shipping & Payment */}
        <Flex gap={4} direction={{ base: "column", sm: "row" }}>
          <Box bg="white" p={6} borderRadius="12px" boxShadow="md" flex="1">
            <Text className={oswald700.className} fontWeight="bold" mb={3}>Shipping Address</Text>
            <Text color="gray.600">{order.shippingAddress}</Text>
            <Text color="gray.600">Phone: {order.phone}</Text>
          </Box>
          <Box bg="white" p={6} borderRadius="12px" boxShadow="md" flex="1">
            <Text className={oswald700.className} fontWeight="bold" mb={3}>Payment</Text>
            <Text color="gray.600">{order.paymentMethod === "COD" ? "Cash on Delivery" : "Credit/Debit Card"}</Text>
            {order.note && <Text color="gray.500" mt={2} fontSize="sm">Note: {order.note}</Text>}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
