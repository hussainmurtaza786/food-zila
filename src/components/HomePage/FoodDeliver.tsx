import { Box, Button, Image, Text, Flex } from "@chakra-ui/react";
import { Oswald } from "@next/font/google";
import { MdLocalShipping } from "react-icons/md";

const oswald = Oswald({ weight: "400", subsets: ["latin"] });

export default function FoodDeliver() {
    return (
        <Flex justify="center" align="center" m="2rem" p="10px" overflow="hidden">
            <Box position="relative" w="100%" maxW="1200px" h="500px" borderRadius="25px" overflow="hidden">
                {/* Background Image with overlay */}
                <Image src="https://img.freepik.com/premium-vector/fast-food-pattern-doodle-hand-drawn-style-white-background_338906-482.jpg" alt="Food Pattern" w="100%" h="100%" />
                <Box position="absolute" top="0" left="0" w="100%" h="100%" bgColor="green" opacity="0.8" zIndex={10} />

                {/* Delivery Man Image */}
                <Box position="absolute" bottom="0" right="0" w={["50%", "40%", "100%", "50%"]} zIndex={10}>
                    <Image src="assets/delivery-man.png" w="100%" />
                </Box>

                {/* Text and Button */}
                <Box position="absolute" top={["5rem", "7rem", "7rem"]} left={["0", "1rem", "0rem", "4rem"]} zIndex={10}>
                    <Text fontSize={["25px", "25px", "35px"]} w={["200px", "300px", "300px", "400px"]} color="white" className={oswald.className} p={4}>
                        Hot and fresh Food in 30 minutes—or a discount on your next order!
                    </Text>
                    <Flex justify="center" align="center">

                        <Button mt="4" leftIcon={<MdLocalShipping size="20px" />} colorScheme="teal" w={["120px", "150px", "200px"]}>
                            ORDER NOW
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}
