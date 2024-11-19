import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Oswald } from "next/font/google";
const oswald = Oswald({ weight: "400", subsets: ["latin"] });

export default function FoodServe() {
  return (
    <Box m='14'>
      <Flex justify="center" align="center">
        <Box textAlign="center">
          <Text color="red" fontSize="13px" fontWeight="bold">
            FOOD PROCESSING{" "}
          </Text>
          <Text className={oswald.className} fontWeight="bold" fontSize="60px">
            HOW WE SERVE YOU?{" "}
          </Text>
        </Box>
      </Flex>
      <Flex justify='center' align='center' gap={10}>
        <Flex justify='center' align='center' direction='column' textAlign='center' _hover={{bgColor:"#ffb936", transition:"0.4s ease-in-out"}} p={7} borderRadius='12px'>
            <Image src="assets/pizza-about.png"/>
            <Text className={oswald.className} fontWeight='bold' fontSize='20px' mb='2'>COOKING WITH CARE</Text>
            <Text w='300px'>It's the perfect dining experience where Experience quick and efficient</Text>
        </Flex>
       
        <Flex justify='center' align='center' direction='column' textAlign='center' bgColor="#ffb936"  p={7} borderRadius='12px'>
            <Image src="assets/pizza-2.png"/>
            <Text className={oswald.className} fontWeight='bold' fontSize='20px' mb='2'>CHOOSE FOOD</Text>
            <Text w='300px'>It's the perfect dining experience where Experience quick and efficient</Text>
        </Flex>
       
        <Flex justify='center' align='center' direction='column' textAlign='center' _hover={{bgColor:"#ffb936", transition:"0.4s ease-in-out"}} p={7} borderRadius='12px'>
            <Image src="assets/rider-about.png"/>
            <Text className={oswald.className} fontWeight='bold' fontSize='20px' mb='2'>QUICK DELIVERY</Text>
            <Text w='300px'>It's the perfect dining experience where Experience quick and efficient</Text>
        </Flex>
       
        
      
      </Flex>
    </Box>
  );
}
