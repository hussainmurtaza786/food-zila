import { Box, Image, Text } from "@chakra-ui/react";
import { Oswald } from "@next/font/google";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const oswald = Oswald({ weight: "400", subsets: ["latin"] });

export default function Chief() {
  return (
    <Box px={{ base: 4, md: 10 }} py={{ base: 10, md: 16 }}>
      {/* Title */}
      <Text
        textAlign="center"
        fontSize={{ base: "28px", sm: "36px", md: "50px", lg: "60px" }}
        className={oswald.className}
        fontWeight="bold"
        mb={{ base: 8, md: 12 }}
      >
        MEET OUR EXPERT CHEFS
      </Text>

      {/* Cards Wrapper */}
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={{ base: 8, md: 6 }}
      >
        {/* CARD 1 */}
        <Box textAlign="center">
          <Box
            position="relative"
            borderRadius="12px"
            overflow="hidden"
            role="group"
          >
            <Image
              alt="chief1"
              src="assets/chief-1.jpg"
              w={{ base: "280px", sm: "320px", md: "100%" }}
              transition="0.3s"
              _groupHover={{ opacity: 0.6 }}
            />

            <Box
              position="absolute"
              bottom="15px"
              left="50%"
              transform="translateX(-50%)"
              display="flex"
              gap="12px"
              color="white"
              opacity="0"
              transition="0.3s"
              _groupHover={{ opacity: 1 }}
            >
              <FaFacebook size="22px" />
              <FaInstagram size="22px" />
              <FaTwitter size="22px" />
              <FaYoutube size="22px" />
            </Box>
          </Box>

          <Box mt={4}>
            <Text color="#00813d" fontWeight="semibold">
              Head Chef
            </Text>
            <Text className={oswald.className} fontSize="24px" fontWeight="bold">
              Leslie Alexander
            </Text>
          </Box>
        </Box>

        {/* CARD 2 */}
        <Box textAlign="center">
          <Box position="relative" borderRadius="12px" overflow="hidden" role="group">
            <Image
              alt="chief2"
              src="assets/chief-2.jpg"
              w={{ base: "280px", sm: "320px", md: "100%" }}
              transition="0.3s"
              _groupHover={{ opacity: 0.6 }}
            />

            <Box
              position="absolute"
              bottom="15px"
              left="50%"
              transform="translateX(-50%)"
              display="flex"
              gap="12px"
              color="white"
              opacity="0"
              transition="0.3s"
              _groupHover={{ opacity: 1 }}
            >
              <FaFacebook size="22px" />
              <FaInstagram size="22px" />
              <FaTwitter size="22px" />
              <FaYoutube size="22px" />
            </Box>
          </Box>

          <Box mt={4}>
            <Text color="#00813d" fontWeight="semibold">
              Sr Table Manager
            </Text>
            <Text className={oswald.className} fontSize="24px" fontWeight="bold">
              Henry Lucas
            </Text>
          </Box>
        </Box>

        {/* CARD 3 */}
        <Box textAlign="center">
          <Box position="relative" borderRadius="12px" overflow="hidden" role="group">
            <Image
              alt="chief3"
              src="assets/chief-3.jpg"
              w={{ base: "280px", sm: "320px", md: "100%" }}
              transition="0.3s"
              _groupHover={{ opacity: 0.6 }}
            />

            <Box
              position="absolute"
              bottom="15px"
              left="50%"
              transform="translateX(-50%)"
              display="flex"
              gap="12px"
              color="white"
              opacity="0"
              transition="0.3s"
              _groupHover={{ opacity: 1 }}
            >
              <FaFacebook size="22px" />
              <FaInstagram size="22px" />
              <FaTwitter size="22px" />
              <FaYoutube size="22px" />
            </Box>
          </Box>

          <Box mt={4}>
            <Text color="#00813d" fontWeight="semibold">
              Senior Cook
            </Text>
            <Text className={oswald.className} fontSize="24px" fontWeight="bold">
              Mateo Levi
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}