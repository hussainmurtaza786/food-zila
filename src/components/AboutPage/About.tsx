import { Box, Image, Text } from "@chakra-ui/react";
import { oswald400, roboto } from "@/lib/fonts";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiUserStarLine } from "react-icons/ri";
import PageBanner from "@/components/common/PageBanner";

export default function About() {
  return (
    <Box bg="whitesmoke" w="100%" overflow="hidden">
      <PageBanner title="ABOUT US" />

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: 4, md: 10, lg: 16 }}
        py={{ base: 8, md: 12 }}
        gap={{ base: 8, md: 10 }}
        alignItems="center"
      >
        <Box flex="1" display="flex" justifyContent="center">
          <Image
            alt="burger"
            src="assets/burger.png"
            w={{ base: "250px", sm: "300px", md: "350px", lg: "400px" }}
          />
        </Box>

        <Box flex="1">
          <Text
            className={oswald400.className}
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
            It&apo;s s the perfect dining experience where every dish is crafted with
            fresh, high-quality ingredients. Experience quick and efficient
            service that ensures your food is served fresh.
          </Text>

          <Box display="flex" flexDirection={{ base: "column", sm: "row" }} gap={6} mt={8}>
            <Box display="flex" gap={4} alignItems="flex-start">
              <IoFastFoodOutline size={40} color="red" />
              <Box>
                <Text className={oswald400.className} fontWeight="bold">
                  SUPER QUALITY FOOD
                </Text>
                <Text className={roboto.className} fontSize="14px">
                  A team of dreamers and doers build unique interactive music and art
                </Text>
              </Box>
            </Box>

            <Box display="flex" gap={4} alignItems="flex-start">
              <RiUserStarLine size={40} color="red" />
              <Box>
                <Text className={oswald400.className} fontWeight="bold">
                  WELL REPUTATION
                </Text>
                <Text className={roboto.className} fontSize="14px">
                  A team of dreamers and doers build unique interactive music and art
                </Text>
              </Box>
            </Box>
          </Box>

          <Box mt={8}>
            <Text
              className={oswald400.className}
              fontWeight="bold"
              textAlign="center"
              fontSize={{ base: "14px", md: "16px" }}
            >
              CUSTOMER&apos;S SATISFACTION IS OUR HIGHEST PRIORITY
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
