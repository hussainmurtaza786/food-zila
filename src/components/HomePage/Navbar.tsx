"use client";
import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
    // Adjust font sizes based on screen size
    const fontSize = useBreakpointValue({ base: "md", md: "lg" });

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={4} // Slightly more padding for a more spacious look
            flexDirection={{ base: "column", md: "row" }}
            bg="white"
            boxShadow="md" // Adding subtle shadow for better separation
        >
            {/* Logo */}
            <Box mb={{ base: 2, md: 0 }} display="flex" justifyContent="center" alignItems="center">
                <Image alt="foodzilla" src="assets/foodzilla.png" w="120px" />
            </Box>

            {/* Navigation Links */}
            <Box
                display="flex"
                fontWeight="bold"
                gap={8}
                flexDirection={{ base: "column", md: "row" }}
                alignItems="center"
            >
                <Text
                    as={Link}
                    href="/"
                    color="text.default"
                    _dark={{ color: "text._dark" }}
                    fontSize={fontSize}
                    position="relative"
                    _before={{
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        bg: "teal.500", // Line color
                        transition: "width 0.3s ease", // Smooth transition for width
                    }}
                    _hover={{
                        _before: {
                            width: "100%", // The line expands to full width on hover
                        },
                    }}
                    transition="color 0.3s ease"
                >
                    Home
                </Text>
                <Text
                    as={Link}
                    href="/shop"
                    color="text.default"
                    _dark={{ color: "text._dark" }}
                    fontSize={fontSize}
                    position="relative"
                    _before={{
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        bg: "teal.500", // Line color
                        transition: "width 0.3s ease",
                    }}
                    _hover={{
                        _before: {
                            width: "100%", // The line expands to full width on hover
                        },
                    }}
                    transition="color 0.3s ease"
                >
                    Shop
                </Text>
                <Text
                    as={Link}
                    href="/about"
                    color="text.default"
                    _dark={{ color: "text._dark" }}
                    fontSize={fontSize}
                    position="relative"
                    _before={{
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        bg: "teal.500", // Line color
                        transition: "width 0.3s ease",
                    }}
                    _hover={{
                        _before: {
                            width: "100%",
                        },
                    }}
                    transition="color 0.3s ease"
                >
                    About
                </Text>
                <Text
                    as={Link}
                    href="/contact"
                    color="text.default"
                    _dark={{ color: "text._dark" }}
                    fontSize={fontSize}
                    position="relative"
                    _before={{
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        bg: "teal.500", // Line color
                        transition: "width 0.3s ease",
                    }}
                    _hover={{
                        _before: {
                            width: "100%",
                        },
                    }}
                    transition="color 0.3s ease"
                >
                    Contact
                </Text>
            </Box>
        </Box>
    );
}
