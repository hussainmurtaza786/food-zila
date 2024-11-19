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
            <Box bgColor="whitesmoke" display='flex' alignItems='center' justifyContent='space-between
            '>
                {/* First Footer Section */}
                <Box

                    p={{ base: 6, md: 10 }}
                    display={{ base: 'block', md: 'flex' }}

                    alignItems='center'
                >
                    <Box mb={{ base: 6, md: 0 }}>
                        <Box m={4} mb={{ base: 2, md: 0 }}>
                            <Image src="assets/foodzilla.png" w='100px' />
                        </Box>
                        <Box  fontSize={{ base: '12px', md: '15px' }} w={{ base: 'auto', md: '250px' }}>
                            <Text m={4}>We believe it has the power to do amazing things.</Text>
                            <Text m={4}>Interested in working with us?</Text>
                            <Text color="#00813d"  className={oswald.className} m={4}>info@example.com</Text>
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
                </Box>

                <Box >
                    <Text  className={oswald.className} fontWeight='bold' mt='0' gap={10}>Quick Links</Text>
                    <Text mt={4}>Services</Text>
                    <Text mt={4}>About Comapany</Text>
                    <Text mt={4}>Latest News</Text>
                    <Text mt={4}>Team Member</Text>
                    <Text mt={4}>testimonials</Text>
                </Box>
                <Box>
                    <Text  className={oswald.className} fontWeight='bold'>My Account</Text>
                    <Text mt={4}>My Profile</Text>
                    <Text mt={4}>My Order History</Text>
                    <Text mt={4}>My Wish List</Text>
                    <Text mt={4}>Order Tracking</Text>
                    <Text mt={4}>Shopping Cart</Text>
                </Box>
                <Box>
                    <Text  className={oswald.className} fontWeight='bold' mt='-27px'>Address</Text>
                    <Text w='160px' mt={4}>570 8th Ave, New York,NY 10018United States</Text>
                    <Text fontWeight='bold'  className={oswald.className} mt={4}>Hours</Text>
                    <Text mt={4} w='160px'>9.30am – 6.30pm
                        Monday to Friday</Text>

                </Box>
                {/* App Store and Google Play Images */}
                <Box m={{ base: 4, md: 6 }} textAlign={{ base: 'center', md: 'left' }}>
                    <Text fontWeight="bolder" m={4} className={oswald.className}>Install App</Text>
                    <Text m={4}>FROM APP STORE OR GOOGLE PLAY</Text>
                    <Box display="flex" gap='6' mt={3} alignItems="center" justifyContent="center">
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
                    <Text m={4} fontSize={{ base: '15px', md: '20px' }} color='#00813d' fontWeight='bold'>+1718-904-4450</Text>
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
