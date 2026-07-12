import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { oswald400 } from "@/lib/fonts";

const serviceCards = [
  { image: "assets/pizza-about.png", alt: "pizza", title: "COOKING WITH CARE", active: false },
  { image: "assets/pizza-2.png", alt: "pizza2", title: "CHOOSE FOOD", active: true },
  { image: "assets/rider-about.png", alt: "rider", title: "QUICK DELIVERY", active: false },
];

export default function FoodServe() {
  return (
    <Box px={{ base: 4, md: 10 }} py={{ base: 10, md: 16 }}>
      <Flex justify="center" align="center" mb={{ base: 8, md: 12 }}>
        <Box textAlign="center">
          <Text color="red" fontSize={{ base: "12px", md: "13px" }} fontWeight="bold">
            FOOD PROCESSING
          </Text>
          <Text
            className={oswald400.className}
            fontWeight="bold"
            fontSize={{ base: "28px", sm: "40px", md: "55px", lg: "60px" }}
          >
            HOW WE SERVE YOU?
          </Text>
        </Box>
      </Flex>

      <Flex
        justify="center"
        align="center"
        gap={{ base: 6, md: 10 }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {serviceCards.map((card) => (
          <Flex
            key={card.title}
            justify="center"
            align="center"
            direction="column"
            textAlign="center"
            bgColor={card.active ? "#ffb936" : undefined}
            p={7}
            borderRadius="12px"
            transition="0.3s"
            _hover={card.active ? undefined : { bgColor: "#ffb936" }}
            w={{ base: "100%", sm: "320px", md: "300px" }}
          >
            <Image alt={card.alt} src={card.image} />
            <Text className={oswald400.className} fontWeight="bold" fontSize="20px" mb="2" mt={4}>
              {card.title}
            </Text>
            <Text fontSize="14px">
              It&apos;s the perfect dining experience where Experience quick and efficient
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
