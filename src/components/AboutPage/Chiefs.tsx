import { Box, Image, Text } from "@chakra-ui/react";
import { Oswald } from "@next/font/google";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const oswald = Oswald({ weight: "400", subsets: ["latin"] });

export default function Chief() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box>
        <Box>
          <Text
            textAlign="center"
            fontSize="60px"
            className={oswald.className}
            fontWeight="bolder"
          >
            MEET OUR EXPERT CHIEFS
          </Text>
        </Box>
        <Box display="flex">
          <Box m={2} display="flex" flexDir="column">
            <Box
              pos='relative'
              width="100%"
              position="relative"
              borderRadius="12px"
              overflow="hidden"
              _groupHover={{ opacity: 0.6 }}
            >
              <Image
                alt="chief1"
                src="assets/chief-1.jpg"
                width="100%"
                height="auto"
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: 0.6 }}
                _hover={{ opacity: '0.6' }}
              />


              <Box
                position="absolute"
                bottom="0"
                left="20"
                display="flex"
                gap="1rem"
                zIndex='1'
                transition="opacity 0.3s ease"
                cursor='pointer'
                color='white'
              >
                <FaFacebook size="2rem" />
                <FaInstagram size="2rem" />
                <FaTwitter size="2rem" />
                <FaYoutube size="2rem" />
              </Box>
            </Box>

            <Box m="4" textAlign="center">
              <Text color="#00813d" fontWeight="semibold" fontSize="15px">
                Head Chief
              </Text>
              <Text
                fontWeight="bolder"
                className={oswald.className}
                fontSize="30px"
              >
                Leslie Alexander
              </Text>
            </Box>
          </Box>
          <Box m={2}>
            <Box
              pos='relative'
              width="100%"
              position="relative"
              borderRadius="12px"
              overflow="hidden"
              _groupHover={{ opacity: 0.6 }}
            >
              <Image
              alt="chief2"
                src="assets/chief-2.jpg"
                width="100%"
                height="auto"
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: 0.6 }}
                _hover={{ opacity: '0.6' }}
              />


              <Box
                position="absolute"
                bottom="0"
                left="20"
                display="flex"
                gap="1rem"
                zIndex='1'
                opacity="1"
                _groupHover={{ opacity: 1 }}
                transition="opacity 0.3s ease"
                cursor='pointer'
                color='white  '
              >
                <FaFacebook size="2rem" />
                <FaInstagram size="2rem" />
                <FaTwitter size="2rem" />
                <FaYoutube size="2rem" />
              </Box>
            </Box>
            <Box m="4" textAlign="center">
              <Text color="#00813d" fontWeight="semibold" fontSize="15px">
                Sr Table Manager
              </Text>
              <Text
                fontWeight="bold"
                className={oswald.className}
                fontSize="30px"
              >
                Henry Lucas
              </Text>
            </Box>
          </Box>
          <Box m={2}>
            <Box
              pos='relative'
              width="100%"
              position="relative"
              borderRadius="12px"
              overflow="hidden"
              _groupHover={{ opacity: 0.6 }}
            >
              <Image
              alt="chief2"
                src="assets/chief-3.jpg"
                width="100%"
                height="auto"
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: 2, bgColor: 'black' }}
                _hover={{ opacity: '0.6' }}
              />


              <Box
                position="absolute"
                bottom="0"
                left="20"
                display="flex"
                gap="1rem"
                zIndex='1'
                opacity="1"
                _groupHover={{ opacity: 1 }}
                transition="opacity 0.3s ease"
                color='white'
                cursor='pointer'
              >
                <FaFacebook size="2rem" />
                <FaInstagram size="2rem" />
                <FaTwitter size="2rem" />
                <FaYoutube size="2rem" />
              </Box>
            </Box>
            <Box m="4" textAlign="center">
              <Text color="#00813d" fontWeight="semibold" fontSize="15px">
                Senoir Cooker
              </Text>
              <Text
                fontWeight="bold"
                className={oswald.className}
                fontSize="30px"
              >
                Mateo Levi
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
