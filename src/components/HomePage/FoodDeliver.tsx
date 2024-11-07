import { Box, Button, Image, Text } from "@chakra-ui/react";

import { Oswald } from '@next/font/google';
import { MdLocalShipping } from "react-icons/md";

const oswald = Oswald({ weight: '400', subsets: ['latin'] });

export default function FoodDeliver() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" m='2rem' p='10px'>
      <Box position="relative" width="100%" height="500px"  >
        {/* Inner box with borderRadius and overflow control */}
        <Box
          width="100%"
          height="100%"
          borderRadius="25px"
          overflow="hidden"
          position="relative"
        >
          <Image
            w="100%"
            h="100%"
            src="https://img.freepik.com/premium-vector/fast-food-pattern-doodle-hand-drawn-style-white-background_338906-482.jpg"
            alt="Background Pattern"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bgColor="green"
            opacity="0.8"
            zIndex={10}
          />
        </Box>
        {/* Bike image positioned outside the inner box */}
        <Box position="absolute" bottom="0" right="-6rem" zIndex={10} w={["100%","100%","100%","70%"]}>
          <Image width='80%' src="assets/delivery-man.png" />
        </Box>
        <Box position='absolute' top={["0","0","9rem",'17rem']} w={["100px","100px","120px",'150px']} left={["0","0","12rem",'14rem']}>
            <Image src="assets/chilli.png"/>
        </Box>
        <Box
          position="absolute"
          top={["0","0","2","7rem"]}
          left={["0","","1rem",'4rem']}
          fontSize={["25px","25px","40px"]}
          p={4}
          w={["200px","300px","300px","400px"]}
          zIndex={10}
        >
          <Text w='100%' className={oswald.className} color='white' >
            Hot and fresh Food in 30 minutes—or a discount on your next order!
          </Text>
        </Box>
        <Box position='absolute' bottom='8rem' zIndex={10} left='4rem' w='600px'>


                    <Button
                        w={["120px", "120px","120px", "200px"]}
                        display="flex"
                        gap={2}
                        h={["40px", "50px", "60px"]}

                    >
                        <MdLocalShipping size='20px' color="white" />
                       ORDER NOW
                    </Button>

        </Box>
      </Box>
    </Box>
  );
}
