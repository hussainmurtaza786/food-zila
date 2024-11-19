import { Box, Button, Input, Text, FormControl, FormLabel, useBreakpointValue, Image } from "@chakra-ui/react";
import { Patrick_Hand } from '@next/font/google';
import { FaPaperPlane, FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";

const patrick_hand = Patrick_Hand({ weight: "400", subsets: ['latin-ext'] });

export default function Contact() {
  return (
    <Box display='flex' flexDirection='column' bgColor='whitesmoke'>
      <Box position='relative'>
        <Image width='100%' h='500px' src="assets/con-banner.jpg" />
        <Text className={patrick_hand.className} position='absolute' top='9.5rem' right='20rem' color='white' fontSize='80px'>CONTACT US</Text>
      </Box>
      <Box w='100%' display='flex' justifyContent='center' alignItems='center'>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          w='600px'
          m={4}
          p={14}
          bgColor="white"
          borderRadius="12px"
          boxShadow="lg"
          mt={8}
        >
          <Text
            fontWeight="bold"
            mb={4}
            color="#00813d"
            className={patrick_hand.className}
            fontSize='40px'
          >
            FILL UP THE FORM
          </Text>
          <Text
            fontSize="md"
            mb={8}
            color="gray.600"
            textAlign="center"
          >
            Your email address will not be published. Required fields are marked *
          </Text>

          <form>
            <Box display="flex" flexDirection="column" gap={6} w="full" maxWidth="500px">
              {/* Name Field */}
              <FormControl id="name" isRequired>
                <FormLabel color="gray.600" fontWeight="bold" className={patrick_hand.className}>
                  Your Name
                </FormLabel>
                <Box display='flex' alignItems='center' gap={2} p={2} borderWidth={1} borderColor="gray.300" borderRadius="md">
                  <FaRegUser size={20} color="gray.600" />
                  <Input
                    type="text"
                    placeholder="Your Name"
                    border="none"
                    borderBottom="1px solid #00813d"
                    _focus={{ borderColor: "#00813d", boxShadow: "0 0 5px rgba(0, 128, 61, 0.5)" }}
                    _hover={{ borderColor: "#00813d" }}
                  />
                </Box>
              </FormControl>

              {/* Email Field */}
              <FormControl id="email" isRequired>
                <FormLabel color="gray.600" fontWeight="bold" className={patrick_hand.className}>
                  Email Address
                </FormLabel>
                <Box display='flex' alignItems='center' gap={2} p={2} borderWidth={1} borderColor="gray.300" borderRadius="md">
                  <HiOutlineMail size={20} color="gray.600" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    border="none"
                    borderBottom="1px solid #00813d"
                    _focus={{ borderColor: "#00813d", boxShadow: "0 0 5px rgba(0, 128, 61, 0.5)" }}
                    _hover={{ borderColor: "#00813d" }}
                  />
                </Box>
              </FormControl>

              {/* Message Field */}
              <FormControl id="message" isRequired>
                <FormLabel color="gray.600" fontWeight="bold" className={patrick_hand.className}>
                  Enter Your Message Here
                </FormLabel>
                <Box display='flex' alignItems='center' gap={2} p={2} borderWidth={1} borderColor="gray.300" borderRadius="md">
                  <IoCreateOutline size={20} color="gray.600" />
                  <Input
                    type="text"
                    placeholder="Your message..."
                    border="none"
                    borderBottom="1px solid #00813d"
                    _focus={{ borderColor: "#00813d", boxShadow: "0 0 5px rgba(0, 128, 61, 0.5)" }}
                    _hover={{ borderColor: "#00813d" }}
                  />
                </Box>
              </FormControl>

              {/* Submit Button */}
              <Button
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgColor="#00813d"
                color="white"
                _hover={{ bgColor: "#006f2c", boxShadow: "0 0 5px rgba(0, 128, 61, 0.5)" }}
                p={6}
                borderRadius="8px"
                fontSize="lg"
                fontWeight="bold"
                gap={3}
                mt={6}
              >
                <FaPaperPlane size={20} />
                <Text>GET IN TOUCH</Text>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
