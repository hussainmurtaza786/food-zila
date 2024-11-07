import { Box, Image, Text } from "@chakra-ui/react";
import { Roboto, Oswald } from '@next/font/google';
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaTwitter } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";

const roboto = Roboto({ weight: '400', subsets: ['latin'] });
const oswald = Oswald({ weight: '700', subsets: ['latin'] });

const socialIcons = [
    { icon: <FaFacebookF /> },
    { icon: <FaTwitter /> },
    { icon: <FaPinterestP /> },
    { icon: <FaLinkedinIn /> },
];

export default function Footer() {
    return (
        <Box>
            {/* First Footer Section */}
            <Box 
                bgColor="whitesmoke" 
                p={{ base: 6, md: 10 }} 
                display={{ base: 'block', md: 'flex' }} 
                justifyContent="space-between"
            >
                <Box mb={{ base: 6, md: 0 }}>
                    <Box m={4} mb={{ base: 2, md: 0 }}>
                        <IoFastFoodOutline color="red" size="50px" />
                        <Text className={oswald.className} fontSize={{ base: '18px', md: '20px' }} fontFamily="body">
                            Food Zila
                        </Text>
                    </Box>
                    <Box color="#00813d" fontSize={{ base: '14px', md: '18px' }} w={{ base: 'auto', md: '300px' }}>
                        <Text m={4}>We believe it has the power to do amazing things.</Text>
                        <Text m={4}>Interested in working with us?</Text>
                        <Text m={4}>info@example.com</Text>
                    </Box>
                    <Box display="flex" m={2}>
                        {socialIcons.map((social, index) => (
                            <Box
                                key={index}
                                bgColor="gray.200"
                                w="30px"
                                h="30px"
                                p={2}
                                borderRadius="50%"
                                _hover={{ bgColor: '#00813d', transition: '2s ease' }}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                margin="5px"
                            >
                                <Box>{social.icon}</Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* App Store and Google Play Images */}
                <Box m={{ base: 4, md: 6 }} textAlign={{ base: 'center', md: 'left' }}>
                    <Text fontWeight="bolder" m={4}>Install App</Text>
                    <Text m={4}>FROM APP STORE OR GOOGLE PLAY</Text>
                    <Box display="flex" gap={4} m={3} alignItems="center" justifyContent="center">
                        <Image
                            src="assets/google-play.png"
                            alt="Google Play"
                            maxW="150px"
                            objectFit="contain"
                        />
                        <Image
                            src="assets/app-store.png"
                            alt="App Store"
                            maxW="150px"
                            objectFit="contain"
                        />
                    </Box>
                    <Text m={4} fontSize={{ base: '12px', md: '15px' }}>24/7 SUPPORT CENTER</Text>
                    <Text m={4} fontSize={{ base: '15px', md: '20px' }}>+1718-904-4450</Text>
                </Box>
            </Box>

            {/* Second Footer Section */}
            <Box 
                bgColor="#00813d" 
                color="white" 
                p={{ base: 6, md: 10 }} 
                display="flex" 
                justifyContent="space-between" 
                flexDirection={{ base: 'column', md: 'row' }} 
                alignItems="center"
            >
                <Box textAlign={{ base: 'center', md: 'left' }}>
                    <Text className={roboto.className} fontSize={{ base: '12px', md: '15px' }}>
                        © Copyright 2024 FoodZila. All Rights Reserved.
                    </Text>
                </Box>
                <Box mt={{ base: 4, md: 0 }}>
                    <Image
                        src="assets/card.png"
                        alt="Payment Methods"
                        style={{ transform: 'rotate(180deg)' }}
                        maxW={{ base: '80%', md: 'none' }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
