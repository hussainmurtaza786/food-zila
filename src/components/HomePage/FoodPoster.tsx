"use client";

import { Box, Button, Image, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { MdLocalShipping } from "react-icons/md";

// Define keyframes for animations
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const FoodPoster = () => {
  return (
    <Box position="relative" w="100%" height='100%' overflow="hidden">

      <Image alt="background" src="/assets/bg-red.jpg" w="100%" />

      <Box
        position="absolute"
        top={0}
        right={0}
        animation={`${fadeIn} 0.8s ease-in-out`}
        display={["none", "block"]}
      >
        <Image alt="onion & tomato" src="/assets/onion+tomato.png" w={["60%", "100%", "100%"]} />
      </Box>

      <Box
        position="absolute"
        top={["2rem", "4rem", "9rem"]}
        left={["2rem", "3rem", "4rem"]}
        animation={`${fadeIn} 1s ease-in-out`}
        zIndex={10}
      >
        <Image alt="shape" src="/assets/left-shape.png" w={["60px", "80px", "100px", "120px"]} />
      </Box>

      <Box
        fontWeight="bold"
        w={["80%", "250px", "350px", "600px"]}
        zIndex={10}
        position="absolute"
        color="white"
        top={["8rem", "10rem", "12rem", "15rem"]}
        left={["2rem", "3rem", "4rem"]}
        animation={`${fadeIn} 1.2s ease-in-out`}
      >
        <Text color="brand.500" fontSize={["md", "lg", "xl", "2xl"]}>
          Crunch into Delight, Every Bite Just Right!
        </Text>

        <Box fontSize={["20px", "24px", "30px", "40px", "60px"]}>
          <Text>HOT SPICY</Text>
          <Text>CHICKEN BURGER</Text>
        </Box>

        <Text m="20px 0" fontWeight="bolder" fontSize={["16px", "18px", "20px"]}>
          LIMITED OFFER / $5
        </Text>

        <Box>
          <Button
            w={["120px", "150px", "200px"]}
            display="flex"
            gap={2}
            h={["40px", "50px", "60px"]}
            animation={`${fadeIn} 1.4s ease-in-out`}
            fontSize={["sm", "md", "lg"]} // Responsive button font-size
          >
            <MdLocalShipping size="20px" color="white" />
            ORDER NOW
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          position="absolute"
          w={["80%", "400px", "500px", "600px"]}
          top={["8rem", "10rem", "12rem"]}
          right={0}
          animation={`${fadeIn} 1.6s ease-in-out`}
        >
          <Image alt="burger" src="/assets/burger.png" w={["80%", "90%", "100%"]} h="auto" />
        </Box>

        <Box
          position="absolute"
          top={["20rem", "22rem", "25rem"]}
          right={["5rem", "10rem", "15rem", "22rem"]}
          animation={`${fadeIn} 1.8s ease-in-out`}
          display={["none", "block"]} // Hide on mobile
        >
          <Image alt="burger-text" src="/assets/burger-text.png" w={["200px", "250px", "300px"]} />
        </Box>

        <Box
          position="absolute"
          top={["5rem", "7rem", "8rem"]}
          right={["4rem", "6rem", "8rem"]}
          animation={`${fadeIn} 2s ease-in-out`}
        >
          <Image
            alt="today-best-deal"
            src="/assets/today_best_deals.png"
            w={["200px", "250px", "300px"]}
            h="auto"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FoodPoster;
