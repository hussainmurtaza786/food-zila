import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Oswald } from "next/font/google";

const oswald = Oswald({ weight: "400", subsets: ["latin"] });

export default function FoodServe() {
  return (
    <Box px={{ base: 4, md: 10 }} py={{ base: 10, md: 16 }}>
      {/* Heading */}
      <Flex justify="center" align="center" mb={{ base: 8, md: 12 }}>
        <Box textAlign="center">
          <Text color="red" fontSize={{ base: "12px", md: "13px" }} fontWeight="bold">
            FOOD PROCESSING
          </Text>

          <Text
            className={oswald.className}
            fontWeight="bold"
            fontSize={{ base: "28px", sm: "40px", md: "55px", lg: "60px" }}
          >
            HOW WE SERVE YOU?
          </Text>
        </Box>
      </Flex>

      {/* Cards */}
      <Flex
        justify="center"
        align="center"
        gap={{ base: 6, md: 10 }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* Card 1 */}
        <Flex
          justify="center"
          align="center"
          direction="column"
          textAlign="center"
          p={7}
          borderRadius="12px"
          transition="0.3s"
          _hover={{ bgColor: "#ffb936" }}
          w={{ base: "100%", sm: "320px", md: "300px" }}
        >
          <Image alt="pizza" src="assets/pizza-about.png" />

          <Text
            className={oswald.className}
            fontWeight="bold"
            fontSize="20px"
            mb="2"
            mt={4}
          >
            COOKING WITH CARE
          </Text>

          <Text fontSize="14px">
            It&apos;s the perfect dining experience where Experience quick and
            efficient
          </Text>
        </Flex>

        {/* Card 2 (active) */}
        <Flex
          justify="center"
          align="center"
          direction="column"
          textAlign="center"
          bgColor="#ffb936"
          p={7}
          borderRadius="12px"
          w={{ base: "100%", sm: "320px", md: "300px" }}
        >
          <Image alt="pizza2" src="assets/pizza-2.png" />

          <Text
            className={oswald.className}
            fontWeight="bold"
            fontSize="20px"
            mb="2"
            mt={4}
          >
            CHOOSE FOOD
          </Text>

          <Text fontSize="14px">
            It&apos;s the perfect dining experience where Experience quick and
            efficient
          </Text>
        </Flex>

        {/* Card 3 */}
        <Flex
          justify="center"
          align="center"
          direction="column"
          textAlign="center"
          p={7}
          borderRadius="12px"
          transition="0.3s"
          _hover={{ bgColor: "#ffb936" }}
          w={{ base: "100%", sm: "320px", md: "300px" }}
        >
          <Image alt="pizza" src="assets/rider-about.png" />

          <Text
            className={oswald.className}
            fontWeight="bold"
            fontSize="20px"
            mb="2"
            mt={4}
          >
            QUICK DELIVERY
          </Text>

          <Text fontSize="14px">
            It&apos;s the perfect dining experience where Experience quick and
            efficient
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}