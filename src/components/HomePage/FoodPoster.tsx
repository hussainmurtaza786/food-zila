"use client";

import { Box, Button, Image, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { MdLocalShipping } from "react-icons/md";
import Link from "next/link";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FoodPoster = () => {
  return (
    <Box position="relative" w="100%" minH={{ base: "700px", sm: "800px", md: "650px", lg: "850px" }} overflow="hidden">
      <Image alt="background" src="/assets/bg-red.jpg" w="100%" h="100%" objectFit="cover" position="absolute" />

      {/* Top Right Decoration */}
      <Box position="absolute" top="0" right="0" animation={`${fadeIn} .8s ease-in-out`} display={{ base: "none", lg: "block" }}>
        <Image alt="onion & tomato" src="/assets/onion+tomato.png" w={{ lg: "350px", xl: "450px" }} />
      </Box>

      {/* Left Shape */}
      <Box position="absolute" top={{ base: 8, md: 16, lg: 24 }} left={{ base: 5, md: 10 }} animation={`${fadeIn} 1s ease-in-out`} zIndex={2}>
        <Image alt="shape" src="/assets/left-shape.png" w={{ base: "70px", md: "100px", lg: "120px" }} />
      </Box>

      {/* Left Content */}
      <Box position="absolute" top={{ base: "120px", sm: "150px", md: "170px", lg: "220px" }} left={{ base: 5, md: 10 }} w={{ base: "90%", md: "45%", lg: "42%" }} color="white" zIndex={2} animation={`${fadeIn} 1.2s ease-in-out`}>
        <Text color="brand.500" fontSize={{ base: "14px", sm: "16px", md: "20px", lg: "24px" }} mb={3}>
          Crunch into Delight, Every Bite Just Right!
        </Text>
        <Text fontWeight="bold" lineHeight="1.1" fontSize={{ base: "34px", sm: "42px", md: "48px", lg: "65px" }}>
          HOT SPICY
        </Text>
        <Text fontWeight="bold" lineHeight="1.1" fontSize={{ base: "34px", sm: "42px", md: "48px", lg: "65px" }}>
          CHICKEN BURGER
        </Text>
        <Text mt={5} mb={8} fontWeight="bold" fontSize={{ base: "16px", md: "18px", lg: "22px" }}>
          LIMITED OFFER / $5
        </Text>
        <Button as={Link} href="/shop" w={{ base: "170px", md: "190px", lg: "220px" }} h={{ base: "50px", md: "55px", lg: "60px" }} gap={2} fontSize={{ base: "14px", md: "16px", lg: "18px" }} animation={`${fadeIn} 1.4s ease-in-out`}>
          <MdLocalShipping size={22} />
          ORDER NOW
        </Button>
      </Box>

      {/* Burger */}
      <Box position="absolute" right={{ base: "50%", md: "20px", lg: "40px" }} transform={{ base: "translateX(50%)", md: "none" }} bottom={{ base: "30px", md: "70px", lg: "60px" }} w={{ base: "320px", sm: "420px", md: "420px", lg: "600px" }} animation={`${fadeIn} 1.6s ease-in-out`}>
        <Image alt="burger" src="/assets/burger.png" w="100%" h="auto" />
      </Box>

      {/* Burger Text */}
      <Box position="absolute" right={{ lg: "220px", xl: "260px" }} top={{ lg: "420px", xl: "500px" }} display={{ base: "none", lg: "block" }} animation={`${fadeIn} 1.8s ease-in-out`}>
        <Image alt="burger-text" src="/assets/burger-text.png" w={{ lg: "220px", xl: "280px" }} />
      </Box>

      {/* Best Deal */}
      <Box position="absolute" top={{ base: "80px", md: "80px", lg: "100px" }} right={{ base: "15px", md: "30px", lg: "90px" }} animation={`${fadeIn} 2s ease-in-out`}>
        <Image alt="today-best-deal" src="/assets/today_best_deals.png" w={{ base: "110px", sm: "140px", md: "180px", lg: "250px" }} h="auto" />
      </Box>
    </Box>
  );
};

export default FoodPoster;
