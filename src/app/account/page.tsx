"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Text, Flex, Button, Input, FormControl, FormLabel, Spinner, useToast, Tabs, TabList,
  TabPanels, Tab, TabPanel,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logoutCustomer, fetchCurrentUser } from "@/redux/slices/customer/authSlice";
import PageBanner from "@/components/common/PageBanner";
import Link from "next/link";
import { FaUser, FaLock, FaShoppingBag, FaHeart, FaSignOutAlt } from "react-icons/fa";

export default function AccountPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { customer, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", zipCode: "" });
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated && !loading) router.push("/auth/login");
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        phone: customer.phone || "",
        address: customer.address || "",
        city: customer.city || "",
        zipCode: customer.zipCode || "",
      });
    }
  }, [customer]);

  useEffect(() => {
    const count = () => {
      try {
        const wl = JSON.parse(localStorage.getItem("foodzilla-wishlist") || "[]");
        setWishlistCount(wl.length);
      } catch { setWishlistCount(0); }
    };
    count();
    window.addEventListener("wishlist-updated", count);
    return () => window.removeEventListener("wishlist-updated", count);
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/customer/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("Failed to update");
      toast({ title: "Profile updated!", status: "success", duration: 3000 });
      dispatch(fetchCurrentUser());
    } catch {
      toast({ title: "Failed to update profile", status: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast({ title: "Passwords don't match", status: "warning" });
      return;
    }
    if (pwForm.newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", status: "warning" });
      return;
    }
    setPwSaving(true);
    try {
      const r = await fetch("/api/customer/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed");
      toast({ title: "Password changed!", status: "success", duration: 3000 });
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (e: unknown) {
      toast({ title: e instanceof Error ? e.message : "Failed to change password", status: "error" });
    } finally {
      setPwSaving(false);
    }
  };

  if (loading || !customer) return <Flex justify="center" py={16}><Spinner size="xl" color="teal.500" /></Flex>;

  return (
    <Box>
      <PageBanner title="MY ACCOUNT" />
      <Box maxW="900px" mx="auto" p={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        {/* Welcome */}
        <Box bg="white" borderRadius="16px" boxShadow="md" p={6} mb={6}>
          <Flex align="center" gap={4}>
            <Box bg="#e6f7ed" w="70px" h="70px" borderRadius="50%" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="2xl" fontWeight="bold" color="#00813d">{customer.name.charAt(0).toUpperCase()}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="xl">Welcome back, {customer.name}!</Text>
              <Text color="gray.500" fontSize="sm">{customer.email}</Text>
            </Box>
          </Flex>
        </Box>

        {/* Quick Stats */}
        <Flex gap={4} mb={6} overflowX="auto" pb={2}>
          <Box flex={1} minW="140px" bg="white" p={4} borderRadius="12px" boxShadow="md" textAlign="center" as={Link} href="/orders" _hover={{ boxShadow: "lg" }}>
            <FaShoppingBag size={24} color="#00813d" />
            <Text fontWeight="bold" fontSize="xl" mt={2}>Orders</Text>
            <Text color="gray.400" fontSize="sm">View history</Text>
          </Box>
          <Box flex={1} minW="140px" bg="white" p={4} borderRadius="12px" boxShadow="md" textAlign="center" as={Link} href="/wishlist" _hover={{ boxShadow: "lg" }}>
            <FaHeart size={24} color="#e53e3e" />
            <Text fontWeight="bold" fontSize="xl" mt={2}>{wishlistCount}</Text>
            <Text color="gray.400" fontSize="sm">Wishlist</Text>
          </Box>
          <Box flex={1} minW="140px" bg="white" p={4} borderRadius="12px" boxShadow="md" textAlign="center" as={Link} href="/track-order" _hover={{ boxShadow: "lg" }}>
            <FaLock size={24} color="#3182ce" />
            <Text fontWeight="bold" fontSize="xl" mt={2}>Track</Text>
            <Text color="gray.400" fontSize="sm">Order status</Text>
          </Box>
        </Flex>

        {/* Tabs */}
        <Box bg="white" borderRadius="16px" boxShadow="md" overflow="hidden">
          <Tabs variant="enclosed" colorScheme="teal">
            <TabList bg="gray.50">
              <Tab gap={2}><FaUser /> Profile</Tab>
              <Tab gap={2}><FaLock /> Password</Tab>
            </TabList>
            <TabPanels>
              {/* Profile Tab */}
              <TabPanel p={{ base: 4, md: 8 }}>
                <Text fontWeight="bold" fontSize="lg" mb={4}>Personal Information</Text>
                <Flex direction="column" gap={4}>
                  <FormControl>
                    <FormLabel fontWeight="bold" fontSize="sm">Full Name</FormLabel>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} borderRadius="8px" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" fontSize="sm">Email Address</FormLabel>
                    <Input value={customer.email} isDisabled bg="gray.50" borderRadius="8px" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" fontSize="sm">Phone Number</FormLabel>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Enter phone number" borderRadius="8px" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" fontSize="sm">Address</FormLabel>
                    <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Enter full address" borderRadius="8px" />
                  </FormControl>
                  <Flex gap={4}>
                    <FormControl>
                      <FormLabel fontWeight="bold" fontSize="sm">City</FormLabel>
                      <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" borderRadius="8px" />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="bold" fontSize="sm">Zip Code</FormLabel>
                      <Input value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} placeholder="Zip code" borderRadius="8px" />
                    </FormControl>
                  </Flex>
                </Flex>
                <Button colorScheme="teal" mt={6} px={8} onClick={handleSaveProfile} isLoading={saving}>
                  Save Changes
                </Button>
              </TabPanel>

              {/* Password Tab */}
              <TabPanel p={{ base: 4, md: 8 }}>
                <Text fontWeight="bold" fontSize="lg" mb={4}>Change Password</Text>
                <Flex direction="column" gap={4} maxW="400px">
                  <FormControl>
                    <FormLabel fontWeight="bold" fontSize="sm">Current Password</FormLabel>
                    <Input type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} borderRadius="8px" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" fontSize="sm">New Password</FormLabel>
                    <Input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} borderRadius="8px" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" fontSize="sm">Confirm New Password</FormLabel>
                    <Input type="password" value={pwForm.confirmPassword} onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })} borderRadius="8px" />
                  </FormControl>
                </Flex>
                <Button colorScheme="teal" mt={6} px={8} onClick={handleChangePassword} isLoading={pwSaving}>
                  Update Password
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {/* Action Buttons */}
        <Flex gap={4} mt={6} direction={{ base: "column", sm: "row" }}>
          <Button as={Link} href="/orders" colorScheme="teal" variant="outline" flex={1} leftIcon={<FaShoppingBag />}>My Orders</Button>
          <Button as={Link} href="/wishlist" colorScheme="red" variant="outline" flex={1} leftIcon={<FaHeart />}>My Wishlist</Button>
          <Button colorScheme="red" variant="ghost" flex={1} leftIcon={<FaSignOutAlt />} onClick={() => { dispatch(logoutCustomer()); router.push("/"); }}>Logout</Button>
        </Flex>
      </Box>
    </Box>
  );
}
