"use client";

import { useState, useEffect } from "react";
import {
  Box, Flex, Text, Spinner, useToast, Button, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, Input, FormControl, FormLabel,
  Table, Thead, Tr, Td, Th, Badge, Tabs, TabList, TabPanels, Tab, TabPanel,
  Stat, StatLabel, StatNumber, SimpleGrid, Icon,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import ProductTable from "./ProductTable";
import UserTable from "./UserTable";
import { oswald700, patrickHand, merriweather } from "@/lib/fonts";
import { userValidationSchema } from "@/lib/validations";
import { Product, User, Order, OrderStatus } from "@/types/user";
import { FaBox, FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "yellow",
  CONFIRMED: "blue",
  PREPARING: "orange",
  OUT_FOR_DELIVERY: "purple",
  DELIVERED: "green",
  CANCELLED: "red",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function DashBoard() {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string; productCount: number }[]>([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catName, setCatName] = useState("");
  const toast = useToast();

  const fetchTabData = async (tabIndex: number) => {
    setLoading(true);
    setError(null);
    try {
      if (tabIndex === 0) {
        const r = await fetch("/api/admin/stats");
        const d = await r.json();
        setStats(d);
      } else if (tabIndex === 1) {
        const r = await fetch("/api/admin/products");
        const d = await r.json();
        setProducts(d.products as Product[]);
      } else if (tabIndex === 2) {
        const r = await fetch("/api/admin/orders");
        const d = await r.json();
        setOrders(d.orders as Order[]);
      } else if (tabIndex === 3) {
        const r = await fetch("/api/admin/categories");
        const d = await r.json();
        setCategories(d.categories || []);
      } else if (tabIndex === 4) {
        const r = await fetch("/api/admin/users");
        const d = await r.json();
        setUsers(d.data as User[]);
      }
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTabData(0); }, []);

  const handleOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const r = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status }),
      });
      if (!r.ok) throw new Error();
      toast({ title: "Order updated", status: "success", duration: 2000 });
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
    } catch {
      toast({ title: "Failed to update order", status: "error" });
    }
  };

  const handleAddCategory = async () => {
    if (!catName.trim()) return;
    try {
      const r = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: catName.trim() }),
      });
      if (!r.ok) throw new Error();
      toast({ title: "Category created", status: "success" });
      setCatName("");
      fetchTabData(3);
    } catch {
      toast({ title: "Failed to create category", status: "error" });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await fetch("/api/admin/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast({ title: "Category deleted", status: "info" });
    } catch {
      toast({ title: "Failed to delete category", status: "error" });
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex direction={{ base: "column", md: "row" }} minH="100vh">
        {/* Sidebar */}
        <Box w={{ base: "100%", md: "280px" }} bg="linear-gradient(135deg,#D1E8E2,#AEEEEE,#F5F5F5)" p={{ base: 5, md: 8 }}>
          <Text className={patrickHand.className} fontSize={{ base: "3xl", md: "5xl" }} mb={6} color="teal.600" textAlign={{ base: "center", md: "left" }}>
            Dashboard
          </Text>

          <Box display="flex" flexDirection={{ base: "row", md: "column" }} gap={{ base: 4, md: 3 }} flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>
            {[
              { label: "Overview", icon: FaBox },
              { label: "Products", icon: FaShoppingCart },
              { label: "Orders", icon: FaShoppingCart },
              { label: "Categories", icon: FaBox },
              { label: "Users", icon: FaUsers },
            ].map((item, i) => (
              <Text
                key={item.label}
                fontSize="xl"
                fontWeight="bold"
                cursor="pointer"
                onClick={() => { setActiveTab(i); fetchTabData(i); }}
                className={oswald700.className}
                color={activeTab === i ? "teal.600" : "gray.700"}
                _hover={{ color: "teal.600" }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon as={item.icon} boxSize={4} />
                {item.label}
              </Text>
            ))}
          </Box>

          <Box mt={8} textAlign={{ base: "center", md: "left" }}>
            <Text className={merriweather.className} fontSize="lg" fontWeight="bold" mb={3}>
              Make Account
            </Text>
            <Button w={{ base: "100%", md: "auto" }} colorScheme="teal" onClick={() => setIsModalOpen(true)}>
              Create Account
            </Button>
          </Box>
        </Box>

        {/* Main */}
        <Flex direction="column" flex="1">
          <Box bg="blue.500" p={6}>
            <Text fontSize={{ base: "2xl", md: "5xl" }} color="white" textAlign="center" className={patrickHand.className}>
              Welcome to Dashboard
            </Text>
          </Box>

          <Box p={{ base: 4, md: 8 }} flex="1">
            {loading ? (
              <Flex justify="center" align="center" h="300px"><Spinner size="xl" color="teal.500" /></Flex>
            ) : error ? (
              <Text textAlign="center" color="red.500">{error}</Text>
            ) : (
              <Tabs index={activeTab} onChange={(i) => { setActiveTab(i); fetchTabData(i); }}>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Products</Tab>
                  <Tab>Orders</Tab>
                  <Tab>Categories</Tab>
                  <Tab>Users</Tab>
                </TabList>
                <TabPanels>
                  {/* Overview */}
                  <TabPanel>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={8}>
                      <Stat bg="white" p={6} borderRadius="12px" boxShadow="md">
                        <StatLabel display="flex" alignItems="center" gap={2}><Icon as={FaShoppingCart} color="teal.500" /> Products</StatLabel>
                        <StatNumber fontSize="3xl">{stats.totalProducts}</StatNumber>
                      </Stat>
                      <Stat bg="white" p={6} borderRadius="12px" boxShadow="md">
                        <StatLabel display="flex" alignItems="center" gap={2}><Icon as={FaUsers} color="blue.500" /> Users</StatLabel>
                        <StatNumber fontSize="3xl">{stats.totalUsers}</StatNumber>
                      </Stat>
                      <Stat bg="white" p={6} borderRadius="12px" boxShadow="md">
                        <StatLabel display="flex" alignItems="center" gap={2}><Icon as={FaBox} color="orange.500" /> Orders</StatLabel>
                        <StatNumber fontSize="3xl">{stats.totalOrders}</StatNumber>
                      </Stat>
                      <Stat bg="white" p={6} borderRadius="12px" boxShadow="md">
                        <StatLabel display="flex" alignItems="center" gap={2}><Icon as={FaDollarSign} color="green.500" /> Revenue</StatLabel>
                        <StatNumber fontSize="3xl" color="green.500">Rs. {stats.totalRevenue.toLocaleString()}</StatNumber>
                      </Stat>
                    </SimpleGrid>
                  </TabPanel>

                  {/* Products */}
                  <TabPanel>
                    <Box overflowX="auto"><ProductTable products={products} /></Box>
                  </TabPanel>

                  {/* Orders */}
                  <TabPanel>
                    <Box overflowX="auto">
                      {orders.length === 0 ? (
                        <Text textAlign="center" color="gray.500" py={10}>No orders yet</Text>
                      ) : (
                        <Table variant="simple" bg="white" borderRadius="12px" overflow="hidden">
                          <Thead bg="gray.100">
                            <Tr>
                              <Th>Order ID</Th>
                              <Th>Customer</Th>
                              <Th>Total</Th>
                              <Th>Payment</Th>
                              <Th>Status</Th>
                              <Th>Actions</Th>
                            </Tr>
                          </Thead>
                          <tbody>
                            {orders.map((order) => (
                              <Tr key={order.id}>
                                <Td fontSize="sm" fontWeight="bold">#{order.id.slice(0, 8)}</Td>
                                <Td>{order.customer?.name || "N/A"}</Td>
                                <Td fontWeight="bold" color="green.600">Rs. {order.total.toLocaleString()}</Td>
                                <Td>{order.paymentMethod === "cod" ? "Cash on Delivery" : "Card"}</Td>
                                <Td><Badge colorScheme={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</Badge></Td>
                                <Td>
                                  <Flex gap={1} flexWrap="wrap">
                                    {order.status === "PENDING" && (
                                      <>
                                        <Button size="xs" colorScheme="green" onClick={() => handleOrderStatus(order.id, "CONFIRMED")}>Confirm</Button>
                                        <Button size="xs" colorScheme="red" onClick={() => handleOrderStatus(order.id, "CANCELLED")}>Cancel</Button>
                                      </>
                                    )}
                                    {order.status === "CONFIRMED" && (
                                      <Button size="xs" colorScheme="orange" onClick={() => handleOrderStatus(order.id, "PREPARING")}>Prepare</Button>
                                    )}
                                    {order.status === "PREPARING" && (
                                      <Button size="xs" colorScheme="purple" onClick={() => handleOrderStatus(order.id, "OUT_FOR_DELIVERY")}>Ship</Button>
                                    )}
                                    {order.status === "OUT_FOR_DELIVERY" && (
                                      <Button size="xs" colorScheme="green" onClick={() => handleOrderStatus(order.id, "DELIVERED")}>Deliver</Button>
                                    )}
                                  </Flex>
                                </Td>
                              </Tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </Box>
                  </TabPanel>

                  {/* Categories */}
                  <TabPanel>
                    <Flex mb={6} gap={3}>
                      <Input
                        placeholder="New category name..."
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        maxW="300px"
                      />
                      <Button colorScheme="teal" onClick={handleAddCategory}>Add</Button>
                    </Flex>
                    {categories.length === 0 ? (
                      <Text color="gray.500">No categories yet</Text>
                    ) : (
                      <Table variant="simple" bg="white" borderRadius="12px" overflow="hidden">
                        <Thead bg="gray.100">
                          <Tr><Th>Name</Th><Th>Slug</Th><Th>Products</Th><Th>Actions</Th></Tr>
                        </Thead>
                        <tbody>
                          {categories.map((cat) => (
                            <Tr key={cat.id}>
                              <Td fontWeight="bold">{cat.name}</Td>
                              <Td>{cat.slug}</Td>
                              <Td>{cat.productCount}</Td>
                              <Td>
                                <Button size="xs" colorScheme="red" onClick={() => handleDeleteCategory(cat.id)}>Delete</Button>
                              </Td>
                            </Tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </TabPanel>

                  {/* Users */}
                  <TabPanel>
                    <Box overflowX="auto"><UserTable users={users} /></Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </Box>
        </Flex>
      </Flex>

      {/* Create Account Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={{ base: "sm", md: "md" }}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name: "", phoneNumber: "", email: "", password: "" }}
              validationSchema={userValidationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await fetch("/api/admin/users", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                  });
                  toast({ title: "Account created", status: "success", duration: 4000, isClosable: true });
                  setIsModalOpen(false);
                } catch {
                  toast({ title: "Failed to create account", status: "error" });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormControl mb={3}><FormLabel>Name</FormLabel><Field as={Input} name="name" /></FormControl>
                  <FormControl mb={3}><FormLabel>Phone</FormLabel><Field as={Input} name="phoneNumber" /></FormControl>
                  <FormControl mb={3}><FormLabel>Email</FormLabel><Field as={Input} name="email" /></FormControl>
                  <FormControl mb={3}><FormLabel>Password</FormLabel><Field as={Input} type="password" name="password" /></FormControl>
                  <Button mt={4} w="100%" colorScheme="teal" isLoading={isSubmitting} type="submit">Create</Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
