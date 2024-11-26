import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import { Oswald } from '@next/font/google';

const oswald = Oswald({ weight: '400', subsets: ['latin'] });

export default function ReservationForm() {
    return (
        <Box>
            <Box position="relative" width="100%" h={{ base: 'auto', md: '600px' }} color='white' >
                <Box w="100%" h="100%">
                    <Image w="100%" h="100%" src="assets/bg-black.jpeg" objectFit="cover" />
                </Box>

                {/* Title Text */}
                <Box
                    className={oswald.className}
                    position="absolute"
                    top={{ base: '3rem', md: '6rem' }}
                    left={{ base: '2rem', md: '4rem' }}
                    color='white'
                    fontSize={{ base: '24px', md: '60px' }}
                    fontWeight="bold"
                    maxWidth="90%"
                >
                    <Text>
                        NEED BOOKING?
                    </Text>
                    <Text>
                        RESERVE YOUR TABLE?
                    </Text>
                </Box>

                {/* Phone Section */}
                <Box
                    display={{ base: 'block', md: 'flex' }}
                    position="absolute"
                    bottom={{ base: '5rem', md: '10rem' }}
                    left={{ base: '2rem', md: '4rem' }}
                    alignItems="center"
                    w="auto"
                >
                    <Box display="flex" mt='6px' justifyContent='center' alignItems='center' bgColor='#00813d' w='60px' h='60px' borderRadius='50%'>
                        <FaPhoneAlt size='40px' />
                    </Box>
                    <Box display="flex" flexDirection='column' m={2} fontSize={{ base: '14px', md: '20px' }} textAlign={{ base: 'center', md: 'left' }}>
                        <Text>
                            24/7 Support center
                        </Text>
                        <Text>
                            +1718-904-4450
                        </Text>
                    </Box>
                </Box>

                {/* Reservation Form */}
                <Box
                    position="absolute"
                    right={{ base: '2rem', md: '5rem' }}
                    color="white"
                    top={{ base: '10rem', md: '5rem' }}
                    borderRadius="25px"
                    bgColor="#00813d"
                    p={{ base: 4, md: 10 }}
                    w={{ base: '100%', md: 'auto' }}
                    maxW="450px"
                    zIndex={2}
                >
                    <Text fontSize={{ base: '18px', md: '22px' }} p={4} textAlign="center">
                        CREATE A RESERVATION
                    </Text>
                    <form>
                        <Box p={3}>
                            <Input
                                w="100%"
                                h="50px"
                                type="number"
                                placeholder="Number of people"
                                sx={{
                                    "::-webkit-input-placeholder": { color: "white" },
                                    "::-moz-placeholder": { color: "white" },
                                    ":-ms-input-placeholder": { color: "white" },
                                }}
                            />
                        </Box>

                        <Box p={3} display="flex" position="relative">
                            <Input
                                w="100%"
                                h="50px"
                                type="tel"
                                placeholder="Phone Number"
                                sx={{
                                    "::-webkit-input-placeholder": { color: "white" },
                                    "::-moz-placeholder": { color: "white" },
                                    ":-ms-input-placeholder": { color: "white" },
                                }}
                            />
                            <Box position="absolute" right="1.5rem" top="2rem">
                                <FaPhoneAlt />
                            </Box>
                        </Box>

                        <Box p={3}>
                            <Input
                                w="100%"
                                h="50px"
                                color="white"
                                type="date"
                                sx={{
                                    "::-webkit-input-placeholder": { color: "white" },
                                    "::-moz-placeholder": { color: "white" },
                                    ":-ms-input-placeholder": { color: "white" },
                                }}
                            />
                        </Box>

                        <Box w="100%" p={3}>
                            <Button w="100%" fontSize={{ base: '16px', md: '18px' }}>
                                BOOK NOW
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}
