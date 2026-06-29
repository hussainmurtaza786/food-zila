import { Box, Image, Text } from "@chakra-ui/react";
import { Patrick_Hand, Oswald, Roboto } from "@next/font/google";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiUserStarLine } from "react-icons/ri";

const patrick_hand = Patrick_Hand({ weight: "400", subsets: ["latin-ext"] });
const oswald = Oswald({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function About() {
  return (
    <Box bg="whitesmoke" w="100%" overflow="hidden">
      {/* Banner */}
      <Box position="relative" w="100%">
        <Image
          alt="contact"
          w="100%"
          h={{ base: "220px", sm: "300px", md: "400px", lg: "500px" }}
          objectFit="cover"
          src="assets/con-banner.jpg"
        />

        <Text
          className={patrick_hand.className}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          fontSize={{ base: "32px", sm: "50px", md: "70px", lg: "80px" }}
          textAlign="center"
          whiteSpace="nowrap"
        >
          ABOUT US
        </Text>
      </Box>

      {/* Content */}
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: 4, md: 10, lg: 16 }}
        py={{ base: 8, md: 12 }}
        gap={{ base: 8, md: 10 }}
        alignItems="center"
      >
        {/* Image */}
        <Box flex="1" display="flex" justifyContent="center">
          <Image
            alt="burger"
            src="assets/burger.png"
            w={{ base: "250px", sm: "300px", md: "350px", lg: "400px" }}
          />
        </Box>

        {/* Text Content */}
        <Box flex="1">
          <Text
            className={oswald.className}
            fontWeight="bold"
            fontSize={{ base: "28px", sm: "36px", md: "48px", lg: "60px" }}
            lineHeight="1.2"
            textAlign={{ base: "center", md: "left" }}
          >
            Where Quality Meet Excellent{" "}
            <Text as="span" color="red">
              Service.
            </Text>
          </Text>

          <Text
            className={roboto.className}
            fontSize={{ base: "14px", md: "15px" }}
            lineHeight="1.8"
            mt={4}
            textAlign={{ base: "center", md: "left" }}
          >
            It's the perfect dining experience where every dish is crafted with
            fresh, high-quality ingredients. Experience quick and efficient
            service that ensures your food is served fresh.
          </Text>

          {/* Features */}
          <Box
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            gap={6}
            mt={8}
          >
            <Box display="flex" gap={4} alignItems="flex-start">
              <IoFastFoodOutline size={40} color="red" />
              <Box>
                <Text className={oswald.className} fontWeight="bold">
                  SUPER QUALITY FOOD
                </Text>
                <Text className={roboto.className} fontSize="14px">
                  A team of dreamers and doers build unique interactive music
                  and art
                </Text>
              </Box>
            </Box>

            <Box display="flex" gap={4} alignItems="flex-start">
              <RiUserStarLine size={40} color="red" />
              <Box>
                <Text className={oswald.className} fontWeight="bold">
                  WELL REPUTATION
                </Text>
                <Text className={roboto.className} fontSize="14px">
                  A team of dreamers and doers build unique interactive music
                  and art
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Footer Line */}
          <Box mt={8}>
            <Text
              className={oswald.className}
              fontWeight="bold"
              textAlign="center"
              fontSize={{ base: "14px", md: "16px" }}
            >
              CUSTOMER'S SATISFACTION IS OUR HIGHEST PRIORITY
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}