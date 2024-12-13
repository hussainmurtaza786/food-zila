"use client"
import React from 'react';
import { Box, Flex, Text, Image, Stack, Icon } from '@chakra-ui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar } from 'react-icons/ai';

// Slick slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const ratings = [
  {
    id: 1,
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    comment: "The food was absolutely amazing! The flavors were perfectly balanced and the service was impeccable. Will definitely come back.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Smith",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    comment: "An unforgettable dining experience. The ambiance was perfect, and the dishes were flavorful and fresh.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily White",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    comment: "Delicious food with great variety. The dessert was a highlight! Highly recommend this place to food lovers.",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Brown",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    comment: "A very pleasant experience overall. The staff was courteous, and the food was top-notch. Definitely worth visiting again.",
    rating: 4,
  },
  {
    id: 5,
    name: "Sarah Green",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    comment: "The restaurant had a cozy atmosphere, and the food exceeded my expectations. Highly recommend the grilled salmon!",
    rating: 5,
  },
  {
    id: 6,
    name: "David Lee",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    comment: "Great food, friendly staff, and reasonable prices. Will definitely return.",
    rating: 4,
  },
  {
    id: 7,
    name: "Sophia Harris",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    comment: "Amazing experience! The appetizers were delicious, and the main course was just perfect. A must-try!",
    rating: 5,
  },
  {
    id: 8,
    name: "Daniel Clark",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    comment: "The service was a bit slow, but the food made up for it. I recommend trying the steak; it's cooked to perfection.",
    rating: 4,
  },
  {
    id: 9,
    name: "Olivia King",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    comment: "Very impressed with the quality and presentation of the food. The dessert was to die for!",
    rating: 5,
  },
  {
    id: 10,
    name: "James Turner",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    comment: "A wonderful meal from start to finish. The cocktails were amazing, and the mains were perfectly seasoned.",
    rating: 5,
  },
];

export default function Responsis() {
  return (
    <Box width="100%" maxWidth="1200px" margin="auto" padding={8}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
        Our Top Rated Clients &apos  Experience
      </Text>
      <Slider {...settings}>
        {ratings.map((rating) => (
          <Box key={rating.id} bg="gray.50" p={6} borderRadius="md" boxShadow="xl">
            <Flex align="center" direction={["column", "row"]}>
              <Image
                borderRadius="full"
                boxSize="80px"
                src={rating.image}
                alt={rating.name}
                mr={[0, 6]}
                mb={[4, 0]}
              />
              <Stack spacing={4} flex="1">
                <Text fontWeight="bold" fontSize="lg">{rating.name}</Text>
                <Flex>
                  {Array.from({ length: rating.rating }, (_, index) => (
                    <Icon key={index} as={AiFillStar} color="yellow.400" boxSize={5} />
                  ))}
                </Flex>
                <Text fontSize="md" color="gray.600">{rating.comment}</Text>
              </Stack>
            </Flex>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
