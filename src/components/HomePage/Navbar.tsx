"use client";

import {
  Box,
  Button,
  Image,
  Text,
  IconButton,
  useBreakpointValue,
  Collapse,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const fontSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Box px={4} py={3} boxShadow="sm" bg="white">
      {/* Top Bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo */}
        <Image alt="foodzilla" src="assets/foodzilla.png" w="100px" />

        {/* Desktop Links */}
        <Box
          display={{ base: "none", md: "flex" }}
          gap={10}
          fontWeight="bold"
          alignItems="center"
        >
          <Text as={Link} href="/" fontSize={fontSize}>
            Home
          </Text>
          <Text as={Link} href="/shop" fontSize={fontSize}>
            Shop
          </Text>
          <Text as={Link} href="/about" fontSize={fontSize}>
            About
          </Text>
          <Text as={Link} href="/contact" fontSize={fontSize}>
            Contact
          </Text>
        </Box>

        {/* Desktop Button */}
        <Box display={{ base: "none", md: "block" }}>
          <Button>Admin Login</Button>
        </Box>

        {/* Mobile Hamburger */}
        <IconButton
          aria-label="menu"
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <IoIosClose  /> : <RxHamburgerMenu  />}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Box>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <Flex
        direction='column'
          mt={4}
          gap={4}
          align="center"
        //   display={{ md: "none" }}
        >
          <Text as={Link} href="/" onClick={() => setIsOpen(false)}>
            Home
          </Text>
          <Text as={Link} href="/shop" onClick={() => setIsOpen(false)}>
            Shop
          </Text>
          <Text as={Link} href="/about" onClick={() => setIsOpen(false)}>
            About
          </Text>
          <Text as={Link} href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Text>

          <Button w="100%">Admin Login</Button>
        </Flex>
      </Collapse>
    </Box>
  );
}