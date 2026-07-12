"use client";

import {
  Box, Button, Image, Text, IconButton, useBreakpointValue, Collapse, Flex, Badge,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchCurrentUser, logoutCustomer } from "@/redux/slices/customer/authSlice";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const fontSize = useBreakpointValue({ base: "md", md: "lg" });
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) => state.cart.totalItems);
  const customer = useSelector((state: RootState) => state.auth.customer);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Box px={4} py={3} boxShadow="sm" bg="white" position="sticky" top={0} zIndex={100}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Link href='/'>
        <Image alt="foodzilla" src="/assets/foodzilla.png" w="100px" />
        </Link>

        {/* Desktop Links */}
        <Box display={{ base: "none", md: "flex" }} gap={10} fontWeight="bold" alignItems="center">
          {navLinks.map((link) => (
            <Text key={link.href} as={Link} href={link.href} fontSize={fontSize} _hover={{ color: "#00813d" }}>
              {link.label}
            </Text>
          ))}
        </Box>

        {/* Desktop Actions */}
        <Box display={{ base: "none", md: "flex" }} gap={3} alignItems="center">
          {/* Cart */}
          <Box position="relative" as={Link} href="/cart" display="flex" alignItems="center">
            <FaShoppingCart size={22} color="#00813d" />
            {cartCount > 0 && (
              <Badge
                position="absolute"
                top="-8px"
                right="-10px"
                colorScheme="red"
                borderRadius="full"
                w="20px"
                h="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="11px"
                color="white"
                bg="red.500"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </Badge>
            )}
          </Box>

          {customer ? (
            <Flex gap={2} align="center">
              <Button as={Link} href="/account" size="sm" variant="ghost" leftIcon={<FaUserCircle />} colorScheme="teal">
                {customer.name}
              </Button>
              <Button as={Link} href="/orders" size="sm" variant="ghost" colorScheme="teal">
                Orders
              </Button>
              <IconButton
                aria-label="Logout"
                icon={<FaSignOutAlt />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={() => dispatch(logoutCustomer())}
              />
            </Flex>
          ) : (
            <Flex gap={2}>
              <Button as={Link} href="/auth/login" size="sm" variant="outline" colorScheme="teal">Login</Button>
              <Button as={Link} href="/auth/register" size="sm" colorScheme="teal">Sign Up</Button>
            </Flex>
          )}
        </Box>

        <IconButton
          aria-label="menu"
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <IoIosClose /> : <RxHamburgerMenu />}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Box>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <Flex direction="column" mt={4} gap={4} align="center">
          {navLinks.map((link) => (
            <Text key={link.href} as={Link} href={link.href} onClick={() => setIsOpen(false)} fontWeight="bold">
              {link.label}
            </Text>
          ))}
          <Flex gap={3} align="center">
            <Box position="relative" as={Link} href="/cart" onClick={() => setIsOpen(false)}>
              <FaShoppingCart size={20} color="#00813d" />
              {cartCount > 0 && (
                <Badge position="absolute" top="-6px" right="-8px" colorScheme="red" borderRadius="full" w="18px" h="18px" display="flex" alignItems="center" justifyContent="center" fontSize="10px" color="white" bg="red.500">
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
              )}
            </Box>
          </Flex>
          {customer ? (
            <Flex gap={3}>
              <Button as={Link} href="/account" onClick={() => setIsOpen(false)} colorScheme="teal" variant="ghost" leftIcon={<FaUserCircle />}>{customer.name}</Button>
              <Button as={Link} href="/orders" onClick={() => setIsOpen(false)} colorScheme="teal" variant="ghost">Orders</Button>
              <Button onClick={() => { dispatch(logoutCustomer()); setIsOpen(false); }} colorScheme="red" variant="ghost" leftIcon={<FaSignOutAlt />}>Logout</Button>
            </Flex>
          ) : (
            <Flex gap={3}>
              <Button as={Link} href="/auth/login" onClick={() => setIsOpen(false)} variant="outline" colorScheme="teal">Login</Button>
              <Button as={Link} href="/auth/register" onClick={() => setIsOpen(false)} colorScheme="teal">Sign Up</Button>
            </Flex>
          )}
        </Flex>
      </Collapse>
    </Box>
  );
}
