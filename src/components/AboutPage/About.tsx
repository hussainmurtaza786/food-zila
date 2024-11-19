import { Box, Image, Text } from "@chakra-ui/react";
import { Patrick_Hand, Oswald, Inter, Roboto } from '@next/font/google';
import { IoFastFoodOutline } from "react-icons/io5";
import { RiUserStarLine } from "react-icons/ri";

const patrick_hand = Patrick_Hand({ weight: "400", subsets: ['latin-ext'] });
const oswald = Oswald({ weight: '400', subsets: ['latin'] });
const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function About() {
    return (
        <Box bgColor='whitesmoke'>
            <Box>
                <Box position='relative'>
                    <Image width='100%' h='500px' src="assets/con-banner.jpg" />
                    <Text className={patrick_hand.className} position='absolute' top='9.5rem' right='20rem' color='white' fontSize='80px'>ABOUT US</Text>
                </Box>

                <Box display='flex'>
                    <Box>
                        <Image src="assets/burger.png" />
                    </Box>
                    <Box mt='3rem'>
                        <Box w='500px' className={oswald.className} >
                            <Text fontWeight='bolder' fontSize='60px' mt='40px'>
                                Where Quality Meet Excellent
                                <Text as='span' color='red' ml='4'>Service.</Text>
                            </Text>
                        </Box>
                        <Box>
                            <Text className={roboto.className} fontSize='15px' w='500px' lineHeight={2}>
                                It's the perfect dining experience where every dish is crafted with fresh, high-quality Experience quick and efficient service that ensures your food is servead fresh It's the dining experience where every dish is crafted with fresh, high-quality ingredients
                            </Text>
                        </Box>
                        <Box display='flex'>
                            <Box display='flex' gap={4} mt='10px'>
                                <IoFastFoodOutline size={40} color="red" />
                                <Box>
                                    <Text className={oswald.className} fontWeight='bold'>SUPER QUALITY FOOD</Text>
                                    <Text w='200px' className={roboto.className} lineHeight={2}>A team of dreamers and doers build unique interactive music and art</Text>
                                </Box>
                            </Box>
                            <Box display='flex' gap={4} mt='10px'>
                                <RiUserStarLine size={40} color="red" />
                                <Box>
                                    <Text className={oswald.className} fontWeight='bold'>WELL REPUTATION</Text>
                                    <Text w='200px' className={roboto.className} lineHeight={2}>A team of dreamers and doers build unique interactive music and art</Text>
                                </Box>
                            </Box>
                        </Box>
                        <Box mt='10px'>
                            <Text className={oswald.className} fontWeight='bold' textAlign='center'>CUTOMER'S SATISFACTION IS OUR HIGHEST PRIORITY</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}