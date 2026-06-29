import { Box, Image, Text } from "@chakra-ui/react";
import { Roboto, Oswald } from "@next/font/google";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const oswald = Oswald({ weight: "700", subsets: ["latin"] });

const socialIcons = [
  { icon: <FaFacebookF /> },
  { icon: <FaTwitter /> },
  { icon: <FaPinterestP /> },
  { icon: <FaLinkedinIn /> },
];

export default function Footer() {

  const year = new Date().getFullYear()
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
          <Image
            alt="foodzilla"
            src="assets/foodzilla.png"
            w="100px"
            mb={4}
          />

          <Text fontSize={{ base: "14px", md: "15px" }} mb={2}>
            We believe it has the power to do amazing things.
          </Text>

          <Text fontSize={{ base: "14px", md: "15px" }} mb={2}>
            Interested in working with us?
          </Text>

          <Text
            color="#00813d"
            className={oswald.className}
            fontSize={{ base: "15px", md: "16px" }}
            mb={5}
          >
            info@foodzilla.com
          </Text>

          <Box display="flex" flexWrap="wrap">
            {socialIcons.map((social, index) => (
              <Box
                key={index}
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
                _hover={{
                  bg: "#00813d",
                  color: "white",
                }}
              >
                {social.icon}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Quick Links */}
        <Box flex="1" minW={{ base: "45%", md: "170px" }}>
          <Text className={oswald.className} fontWeight="bold" mb={5}>
            Quick Links
          </Text>

          <Text mb={3}>Services</Text>
          <Text mb={3}>About Company</Text>
          <Text mb={3}>Latest News</Text>
          <Text mb={3}>Team Member</Text>
          <Text>Testimonials</Text>
        </Box>

        {/* My Account */}
        <Box flex="1" minW={{ base: "45%", md: "170px" }}>
          <Text className={oswald.className} fontWeight="bold" mb={5}>
            My Account
          </Text>

          <Text mb={3}>My Profile</Text>
          <Text mb={3}>My Order History</Text>
          <Text mb={3}>My Wish List</Text>
          <Text mb={3}>Order Tracking</Text>
          <Text>Shopping Cart</Text>
        </Box>

        {/* Address */}
        <Box flex="1" minW={{ base: "100%", sm: "220px", md: "180px" }}>
          <Text className={oswald.className} fontWeight="bold" mb={5}>
            Address
          </Text>

          <Text maxW="180px" mb={5}>
            570 8th Ave, New York, NY 10018 United States
          </Text>

          <Text className={oswald.className} fontWeight="bold" mb={3}>
            Hours
          </Text>

          <Text maxW="180px">
            9:30am – 6:30pm
            <br />
            Monday to Friday
          </Text>
        </Box>

        {/* Install App */}
        <Box flex="1" minW={{ base: "100%", md: "250px" }}>
          <Text className={oswald.className} fontWeight="bold" mb={4}>
            Install App
          </Text>

          <Text mb={5}>FROM APP STORE OR GOOGLE PLAY</Text>

          <Box
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            gap={4}
            alignItems={{ base: "flex-start", sm: "center" }}
            mb={5}
          >
            <Image
              src="assets/google-play.png"
              alt="Google Play"
              maxW="150px"
            />

            <Image
              src="assets/app-store.png"
              alt="App Store"
              maxW="150px"
            />
          </Box>

          <Text fontSize={{ base: "14px", md: "15px" }} mb={2}>
            24/7 SUPPORT CENTER
          </Text>

          <Text
            fontSize={{ base: "18px", md: "22px" }}
            color="#00813d"
            fontWeight="bold"
          >
            +1617-804-2210
          </Text>
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
        <Text
          className={roboto.className}
          textAlign={{ base: "center", md: "left" }}
          fontSize={{ base: "13px", md: "15px" }}
        >
          © Copyright {year}  FoodZila. All Rights Reserved.
        </Text>

        <Image
          src="assets/card.png"
          alt="Payment Methods"
          transform="rotate(180deg)"
          maxW={{ base: "220px", md: "280px" }}
        />
      </Box>
    </Box>
  );
}