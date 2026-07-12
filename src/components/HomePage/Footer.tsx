"use client";

import { Box, Text, Image } from "@chakra-ui/react";
import { roboto, oswald700 } from "@/lib/fonts";
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const socialIcons = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaPinterestP />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
];

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "About Company", href: "/about" },
  { label: "Latest News", href: "/news" },
  { label: "Team Member", href: "/team" },
  { label: "Testimonials", href: "/testimonials" },
];

const accountLinks = [
  { label: "My Profile", href: "/account" },
  { label: "My Order History", href: "/orders" },
  { label: "My Wish List", href: "/wishlist" },
  { label: "Order Tracking", href: "/track-order" },
  { label: "Shopping Cart", href: "/cart" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box>
      <Box
        bg="whitesmoke"
        px={{ base: 6, md: 10, lg: 16 }}
        py={{ base: 10, md: 12 }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems={{ base: "flex-start", md: "flex-start" }}
        gap={{ base: 10, md: 8 }}
      >
        {/* Logo Section */}
        <Box flex="1" minW={{ base: "100%", sm: "250px", lg: "280px" }}>
          <Image alt="foodzilla" src="/assets/foodzilla.png" w="100px" mb={4} />
          <Text fontSize={{ base: "14px", md: "15px" }} mb={2}>
            We believe it has the power to do amazing things.
          </Text>
          <Text fontSize={{ base: "14px", md: "15px" }} mb={2}>
            Interested in working with us?
          </Text>
          <Text color="#00813d" className={oswald700.className} fontSize={{ base: "15px", md: "16px" }} mb={5}>
            info@foodzilla.com
          </Text>

          <Box display="flex" flexWrap="wrap">
            {socialIcons.map((social, index) => (
              <Box
                key={index}
                as={Link}
                href={social.href}
                bg="gray.200"
                w="38px"
                h="38px"
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr={3}
                mb={2}
                cursor="pointer"
                transition="0.3s"
                _hover={{ bg: "#00813d", color: "white" }}
              >
                {social.icon}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Quick Links */}
        <Box flex="1" minW={{ base: "45%", md: "170px" }}>
          <Text className={oswald700.className} fontWeight="bold" mb={5}>Quick Links</Text>
          {quickLinks.map((link) => (
            <Text key={link.href} mb={3}>
              <Link href={link.href}>
                <Text as="span" _hover={{ color: "#00813d", textDecoration: "underline" }} cursor="pointer">
                  {link.label}
                </Text>
              </Link>
            </Text>
          ))}
        </Box>

        {/* My Account */}
        <Box flex="1" minW={{ base: "45%", md: "170px" }}>
          <Text className={oswald700.className} fontWeight="bold" mb={5}>My Account</Text>
          {accountLinks.map((link) => (
            <Text key={link.href} mb={3}>
              <Link href={link.href}>
                <Text as="span" _hover={{ color: "#00813d", textDecoration: "underline" }} cursor="pointer">
                  {link.label}
                </Text>
              </Link>
            </Text>
          ))}
        </Box>

        {/* Address */}
        <Box flex="1" minW={{ base: "100%", sm: "220px", md: "180px" }}>
          <Text className={oswald700.className} fontWeight="bold" mb={5}>Address</Text>
          <Text maxW="180px" mb={5}>570 8th Ave, New York, NY 10018 United States</Text>
          <Text className={oswald700.className} fontWeight="bold" mb={3}>Hours</Text>
          <Text maxW="180px">9:30am – 6:30pm<br />Monday to Friday</Text>
        </Box>

        {/* Install App */}
        <Box flex="1" minW={{ base: "100%", md: "250px" }}>
          <Text className={oswald700.className} fontWeight="bold" mb={4}>Install App</Text>
          <Text mb={5}>FROM APP STORE OR GOOGLE PLAY</Text>
          <Box display="flex" flexDirection={{ base: "column", sm: "row" }} gap={4} alignItems={{ base: "flex-start", sm: "center" }} mb={5}>
            <Image src="/assets/google-play.png" alt="Google Play" maxW="150px" />
            <Image src="/assets/app-store.png" alt="App Store" maxW="150px" />
          </Box>
          <Text fontSize={{ base: "14px", md: "15px" }} mb={2}>24/7 SUPPORT CENTER</Text>
          <Text fontSize={{ base: "18px", md: "22px" }} color="#00813d" fontWeight="bold">+1617-804-2210</Text>
        </Box>
      </Box>

      {/* Bottom Footer */}
      <Box
        bg="#00813d"
        color="white"
        px={{ base: 6, md: 10, lg: 16 }}
        py={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <Text className={roboto.className} textAlign={{ base: "center", md: "left" }} fontSize={{ base: "13px", md: "15px" }}>
          © Copyright {year} FoodZila. All Rights Reserved.
        </Text>
        <Image src="/assets/card.png" alt="Payment Methods" transform="rotate(180deg)" maxW={{ base: "220px", md: "280px" }} />
      </Box>
    </Box>
  );
}
