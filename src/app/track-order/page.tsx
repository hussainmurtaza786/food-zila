"use client";

import { Box, Text, Input, Button, Flex, Spinner, Badge, Image } from "@chakra-ui/react";
import { useState } from "react";
import PageBanner from "@/components/common/PageBanner";
import { oswald700 } from "@/lib/fonts";
import { FaSearch, FaCheckCircle, FaClock, FaUtensils, FaTruck, FaBox } from "react-icons/fa";

const STATUS_STEPS: { status: string; icon: typeof FaClock; label: string }[] = [
  { status: "PENDING", icon: FaClock, label: "Order Placed" },
  { status: "CONFIRMED", icon: FaCheckCircle, label: "Confirmed" },
  { status: "PREPARING", icon: FaUtensils, label: "Preparing" },
  { status: "OUT_FOR_DELIVERY", icon: FaTruck, label: "Out for Delivery" },
  { status: "DELIVERED", icon: FaBox, label: "Delivered" },
];

const STATUS_ORDER = ["PENDING", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<{ id: string; status: string; total: number; createdAt: string; items: { product: { title: string; imgUrl: string | null }; quantity: number; price: number }[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const r = await fetch(`/api/orders/${orderId.trim()}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Order not found");
      setOrder(d.order);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Order not found. Please check your Order ID.");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order ? STATUS_ORDER.indexOf(order.status) : -1;

  return (
    <Box>
      <PageBanner title="TRACK ORDER" />
      <Box maxW="800px" mx="auto" p={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        <Box textAlign="center" mb={10}>
          <Text className={oswald700.className} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={3}>
            Enter Your Order ID
          </Text>
          <Text color="gray.500" mb={6}>Find your order ID in the confirmation email or in your order history.</Text>

          <Flex maxW="500px" mx="auto" gap={3}>
            <Input
              placeholder="e.g. clxyz123..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              h="50px"
              borderRadius="12px"
            />
            <Button colorScheme="teal" h="50px" px={6} onClick={handleTrack} isLoading={loading} leftIcon={<FaSearch />}>
              Track
            </Button>
          </Flex>
        </Box>

        {error && (
          <Box bg="red.50" border="1px solid red.200" borderRadius="12px" p={4} textAlign="center">
            <Text color="red.600">{error}</Text>
          </Box>
        )}

        {loading && (
          <Flex justify="center" py={10}><Spinner size="xl" color="teal.500" /></Flex>
        )}

        {order && (
          <Box bg="white" borderRadius="16px" boxShadow="md" p={{ base: 4, md: 8 }}>
            {/* Status Timeline */}
            <Flex justify="space-between" mb={4} position="relative">
              <Box position="absolute" top="18px" left="40px" right="40px" h="3px" bg="gray.200" zIndex={0} />
              <Box position="absolute" top="18px" left="40px" h="3px" bg="green.500" zIndex={1} w={`${Math.max(0, (currentStepIndex / (STATUS_STEPS.length - 1)) * 100)}%`} transition="width 0.5s" />
              {STATUS_STEPS.map((step, i) => {
                const isActive = i <= currentStepIndex;
                const isCurrent = STATUS_ORDER[currentStepIndex] === step.status;
                return (
                  <Box key={step.status} display="flex" flexDirection="column" alignItems="center" flex={1} zIndex={2}>
                    <Box
                      bg={isActive ? "green.500" : "gray.200"}
                      color="white"
                      w="38px"
                      h="38px"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border={isCurrent ? "3px solid #38a169" : "3px solid white"}
                      boxShadow={isCurrent ? "0 0 0 3px rgba(56,161,105,0.3)" : "none"}
                    >
                      <step.icon size={16} />
                    </Box>
                    <Text fontSize={{ base: "9px", md: "xs" }} mt={2} textAlign="center" fontWeight={isCurrent ? "bold" : "normal"} color={isActive ? "green.600" : "gray.400"}>
                      {step.label}
                    </Text>
                  </Box>
                );
              })}
            </Flex>

            <Box bg="gray.50" borderRadius="12px" p={4} mt={6}>
              <Flex justify="space-between" mb={2}>
                <Text fontWeight="bold">Order ID:</Text>
                <Text fontSize="sm" color="gray.600">#{order.id.slice(0, 12)}</Text>
              </Flex>
              <Flex justify="space-between" mb={2}>
                <Text fontWeight="bold">Status:</Text>
                <Badge colorScheme={order.status === "DELIVERED" ? "green" : order.status === "CANCELLED" ? "red" : "blue"}>
                  {order.status.replace(/_/g, " ")}
                </Badge>
              </Flex>
              <Flex justify="space-between" mb={2}>
                <Text fontWeight="bold">Total:</Text>
                <Text color="#00813d" fontWeight="bold">Rs. {order.total.toLocaleString()}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Date:</Text>
                <Text fontSize="sm" color="gray.600">{new Date(order.createdAt).toLocaleDateString()}</Text>
              </Flex>
            </Box>

            {/* Items */}
            <Text fontWeight="bold" mt={6} mb={3}>Items Ordered:</Text>
            {order.items.map((item, i) => (
              <Flex key={i} align="center" gap={3} p={3} bg="gray.50" borderRadius="8px" mb={2}>
                <Image src={item.product.imgUrl || ""} alt={item.product.title} w="48px" h="48px" objectFit="cover" borderRadius="8px" />
                <Box flex={1}>
                  <Text fontWeight="bold" fontSize="sm">{item.product.title}</Text>
                  <Text color="gray.500" fontSize="xs">Qty: {item.quantity}</Text>
                </Box>
                <Text fontWeight="bold" fontSize="sm">Rs. {(item.price * item.quantity).toLocaleString()}</Text>
              </Flex>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
