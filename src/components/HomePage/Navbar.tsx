"use client";
import { Box, Button, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";

import { Oswald } from '@next/font/google';

const oswald = Oswald({ weight: '700', subsets: ['latin'] });

export default function Navbar() {
    // Adjust font sizes based on screen size
    const fontSize = useBreakpointValue({ base: "md", md: "lg" });

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bg=""
            flexDirection={{ base: "column", md: "row" }}
        >
            {/* Logo */}
            <Box mb={{ base: 2, md: 0 }}>
                <Image src="assets/foodzilla.png" w='100px' />
               
            </Box>

            {/* Navigation Links */}
            <Box
                display="flex"
                fontWeight="bold"
                gap={10}
                flexDirection={{ base: "column", md: "row" }}
                alignItems={{ base: "center", md: "flex-start" }}
            >
                <Text as={Link} href="/" color="text.default" _dark={{ color: "text._dark" }} fontSize={fontSize}>
                    Home
                </Text>
                <Text as={Link} href="/shop" color="text.default" _dark={{ color: "text._dark" }} fontSize={fontSize}>
                    Shop
                </Text>
                <Text as={Link} href="/about" color="text.default" _dark={{ color: "text._dark" }} fontSize={fontSize}>
                    About
                </Text>
                <Text as={Link} href="/contact" color="text.default" _dark={{ color: "text._dark" }} fontSize={fontSize}>
                    Contact
                </Text>
            </Box>

            {/* Admin Login Button */}
            <Box mt={{ base: 2, md: 0 }}>
                <Button variant="solid" size="md">
                    Admin Login
                </Button>
            </Box>
        </Box>
    );
}
