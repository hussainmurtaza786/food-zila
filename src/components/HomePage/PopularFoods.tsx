"use client";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Oswald, Patrick_Hand, Nunito } from '@next/font/google';
import { MdLocalShipping } from "react-icons/md";

const oswald = Oswald({ weight: '700', subsets: ['latin'] });
const patrick_hand = Patrick_Hand({ weight: "400", subsets: ['latin-ext'] });
const nunito = Nunito({ weight: "400", subsets: ['latin-ext'] });

const FOOD_ITEMS = [
    { name: "Pizza", image: "/assets/pizza.png" },
    { name: "Burger", image: "/assets/burger.png" },
    { name: "French Fries", image: "/assets/fries.png" },
    { name: "Biryani", image: "/assets/biryani.png" },
    { name: "Sushi", image: "/assets/sushi.webp" },
    { name: "Ras Malai", image: "/assets/ras-malai.webp" },
    { name: "Haleem", image: "/assets/haleem.png" },
];

export default function PopularFoods() {
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Box>
            <Box bgColor="whitesmoke" py={8} px={4}>
                <Heading as="h1" textAlign="center" mb={8} fontSize={["2xl", "3xl", "4xl"]} color="gray.700">
                    POPULAR FOOD ITEMS
                </Heading>
                <Box m={4}>
                    <Slider {...settings}>
                        {FOOD_ITEMS.map((item, index) => (
                            <Box
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                key={index}
                                p={4}
                                mx={2}
                                borderRadius="20px"
                                boxShadow="lg"
                                bg="white"
                                _hover={{
                                    transform: "scale(1.05)",
                                    boxShadow: "2xl",
                                    bgColor: "#ffb936",
                                    transition: "transform 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease",
                                }}
                                transition="transform 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease"
                                height={["250px", "300px", "350px"]}
                                width="100%"
                                m={12}
                            >
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        filter="brightness(0.8)"
                                        borderRadius="20px"
                                        w={["150px", "200px", "250px"]}
                                        h={["150px", "200px", "250px"]}
                                    />
                                </Box>
                                <Box p={4} textAlign="center">
                                    <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold" color="white">
                                        {item.name}
                                    </Text>
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Box>

            <Box display='flex' flexWrap='wrap' justifyContent='center' mt={8}>
                <Box m={4} borderRadius='25px' overflow='hidden' position='relative' w={["100%", "100%", "600px"]} h={["250px", "400px"]}>
                    <Image alt="bg-black" src="assets/bg-black.jpeg" w='100%' h='100%' objectFit="cover" />
                    <Box position='absolute' bottom='0'>
                        <Image alt="bg-red" src="assets/bg-red.png" w='600px' h='400px' />
                    </Box>
                    <Box  position='absolute' top={['0', '6rem', "8rem", '0']} zIndex={1} right={["1rem", "2rem", "0", "3rem"]}>
                        <Image
                            alt="burger-deal"
                            w={["200px", "250px", "250px", "350px"]}
                            h={["200px", "250px", "250px", "350px"]}
                            borderRadius='25px'
                            src="assets/burger-deal.png"
                            transition="transform 0.3s ease-in-out"
                            _hover={{ transform: "scale(1.1)" }}
                        />
                    </Box>

                    <Box m={2} color='white' position='absolute' top={["5", "10"]} fontSize={["16px", "20px", "30px"]} fontWeight='bold' className={oswald.className} width='300px'>
                        <Text>Savor the crunch of the burger, paired with crispy fries and a refreshing drink!</Text>
                    </Box>
                    <Box
                        position="absolute"
                        top={["0", "7rem", "6rem", "1rem"]}
                        right="1rem"
                        w={["40px", "60px", "60px", "80px"]}
                        h={["40px", "60px", "60px", "80px"]}
                        borderRadius="50%"
                        backgroundColor="red.500"
                        color="white"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize={["md", "xl", "2xl"]}
                        fontWeight="bold"
                        animation="zoom 2s infinite"
                        textAlign='center'
                    >
                        50% OFF
                    </Box>

                    <style jsx global>{`
                        @keyframes zoom {
                            0%, 100% {
                                transform: scale(1);
                            }
                            50% {
                                transform: scale(1.2); 
                            }
                        }
                    `}</style>
                </Box>

                <Box m={4} borderRadius='25px' overflow='hidden' position='relative' w={["100%", "100%", "600px"]} h={["250px", "400px"]}>
                    <Image alt="bg" src="assets/bg-red.jpg" w='100%' h='100%' objectFit="cover" />
                    <Box position='absolute' top={['2rem', '1rem', '2rem']} right={['2rem', '0rem', "12rem", '2rem']}>
                        <Image alt="mint" opacity='0.5' w={["40px", "70px"]} src="assets/mint-leaves.png" />
                    </Box>
                    <Box position='absolute' top={['15rem', '9rem', '11rem', "17rem"]} right='1rem'>
                        <Image alt="chilli" opacity='0.5' w={["60px", "100px"]} src="assets/chilli.png" />
                    </Box>
                    <Box position='absolute' top={['15rem', "15rem", "13rem", "15rem"]} left='2rem'>
                        <Image alt="cheese" opacity='0.5' w={["80px", "150px"]} src="assets/cheese.webp" />
                    </Box>
                    <Box position='absolute' top={["1rem", "1rem", "0rem",]} zIndex={1} right={["1rem", "1rem", "0rem"]}>
                        <Image
                            alt="pizza"
                            w={["50px", "150px", "220px", "350px"]}
                            h={["10px", "150px", "220px", "350px"]}
                            borderRadius='25px'
                            src="assets/pizza-deal.png"
                            transition="transform 0.3s ease-in-out"
                            _hover={{ transform: "scale(1.1)" }}
                        />
                    </Box>

                    <Box m={2} color='white' position='absolute' top="10" fontSize={["16px", "60px", "50px", "60px"]} fontWeight='bold' className={oswald.className} width={["200px", '200px', "250px", "300px"]}>
                        <Text zIndex={10} className={patrick_hand.className}>Super Delicious Cheesy Pizza</Text>
                    </Box>
                </Box>
            </Box>

            <Box w='100%' h={{ base: '300px', md: '400px', lg: '500px' }} position='relative'>
                <Image alt="bg" src="assets/bg-black.jpeg" w='100%' h='100%' objectFit="cover" />

                <Box
                    position='absolute'
                    w={{ base: '80%', md: '500px' }}
                    top={{ base: '4rem', md: '8rem' }}
                    right={{ base: '2rem', md: '8rem' }}
                    opacity='0.7'
                    borderRadius='25px'
                    overflow='hidden'
                >
                    <Image alt="grilled" src="assets/grilled.png" />
                </Box>

                <Box position='absolute' bottom={{ base: '1rem', md: '1.5rem' }} right={{ base: '2rem', md: '6rem' }} w={{ base: '0px', md: '150px' }}>
                    <Image alt="chilli" src="assets/chilli.png" />
                </Box>

                <Box position='absolute' top={{ base: '5rem', md: '7rem' }} right={{ base: '2rem', md: '30rem' }} w={{ base: '0px', md: '150px' }} transform='rotate(180deg)'>
                    <Image alt="chilli" src="assets/chilli.png" />
                </Box>

                <Box position='absolute' top={{ base: '2rem', md: '4rem' }} right={{ base: '1rem', md: '12rem' }}>
                    <Image alt="today-best-deal" src="assets/today_best_deals.png" />
                </Box>
                <Box position='absolute' bottom='0' right='0' w='150px'>
                    <Image alt="tomato" src="assets/tomato-shape.png" />
                </Box>

                <Box position='absolute' top={{ base: '8rem', md: '10rem' }} left={{ base: '2rem', md: '5rem' }} color='white' fontSize={{ base: '30px', md: '40px', lg: '60px' }} w={{ base: '80%', md: '500px' }}>
                    <Text className={nunito.className} m='0px 7px' fontSize={{ base: '14px', md: '16px', lg: '20px' }}>Save 20%</Text>
                    <Text className={oswald.className} fontSize={{ base: '24px', md: '60px' }}>SIGNATURE DISH OF THE DAY</Text>
                </Box>

                <Box className={nunito.className} position='absolute' bottom={{ base: '3rem', md: '4.5rem' }} left={{ base: '2rem', md: '5rem' }}>

                    <Button
                        w={["120px", "150px", "200px"]}
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
