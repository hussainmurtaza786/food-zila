import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import { Oswald } from "@next/font/google";

const oswald = Oswald({ weight: "400", subsets: ["latin"] });

export default function ReservationForm() {
  return (
    <Box>
      <Box
        position="relative"
        w="100%"
        minH={{ base: "950px", md: "600px" }}
        color="white"
      >
        <Image
          alt="bg-img"
          src="assets/bg-black.jpeg"
          w="100%"
          h="100%"
          objectFit="cover"
          position="absolute"
          top="0"
          left="0"
        />

        {/* Left Content */}
        <Box
          position="absolute"
          left={{ base: 6, md: 10 }}
          top={{ base: 8, md: 20 }}
          maxW={{ base: "90%", lg: "45%" }}
          zIndex={2}
        >
          <Text
            className={oswald.className}
            fontSize={{ base: "30px", sm: "38px", md: "52px", lg: "60px" }}
            fontWeight="bold"
            lineHeight="1.2"
          >
            NEED BOOKING?
          </Text>

          <Text
            className={oswald.className}
            fontSize={{ base: "30px", sm: "38px", md: "52px", lg: "60px" }}
            fontWeight="bold"
            lineHeight="1.2"
          >
            RESERVE YOUR TABLE?
          </Text>

          <Box
            display="flex"
            alignItems="center"
            mt={{ base: 10, md: 20 }}
            flexDirection={{ base: "column", sm: "row" }}
            textAlign={{ base: "center", sm: "left" }}
          >
            <Box
              bg="#00813d"
              w="60px"
              h="60px"
              borderRadius="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <FaPhoneAlt size={28} />
            </Box>

            <Box ml={{ base: 0, sm: 4 }} mt={{ base: 4, sm: 0 }}>
              <Text fontSize={{ base: "16px", md: "18px" }}>
                24/7 Support Center
              </Text>
              <Text
                fontSize={{ base: "18px", md: "22px" }}
                fontWeight="bold"
              >
                +1617-804-2210
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Reservation Form */}
        <Box
          position={{ base: "relative", md: "absolute" }}
          top={{ base: "430px", md: "80px" }}            
          right={{ md: "60px" }}
          mx={{ base: 6, md: 0 }}
          bg="#00813d"
          borderRadius="25px"
          p={{ base: 6, md: 10 }}
        //   w={{ base: "calc(100% - 48px)", sm: "420px", md: "430px" }}
          zIndex={2}
        >
          <Text
            className={oswald.className}
            textAlign="center"
            fontSize={{ base: "22px", md: "26px" }}
            mb={6}
          >
            CREATE A RESERVATION
          </Text>

          <form>
            <Box mb={5}>
              <Input
                h="52px"
                type="number"
                placeholder="Number of people"
                color="white"
                _placeholder={{ color: "white" }}
              />
            </Box>

            <Box position="relative" mb={5}>
              <Input
                h="52px"
                type="tel"
                placeholder="Phone Number"
                color="white"
                pr="50px"
                _placeholder={{ color: "white" }}
              />

              <Box
                position="absolute"
                right="18px"
                top="50%"
                transform="translateY(-50%)"
              >
                <FaPhoneAlt />
              </Box>
            </Box>

            <Box mb={6}>
              <Input h="52px" type="date" color="white" />
            </Box>

            <Button w="100%" h="52px" fontSize="16px">
              BOOK NOW
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}