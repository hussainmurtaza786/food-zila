"use client";

import { Box, Text, SimpleGrid, Image, Flex } from "@chakra-ui/react";
import PageBanner from "@/components/common/PageBanner";
import { oswald700 } from "@/lib/fonts";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const team = [
  { name: "Ahmad Khan", role: "Head Chef", img: "/assets/chef-1.jpg", bio: "15+ years of culinary experience specializing in continental and Pakistani cuisine." },
  { name: "Sara Malik", role: "Pastry Chef", img: "/assets/chef-2.jpg", bio: "Creative pastry artist with a passion for creating visually stunning desserts." },
  { name: "Hassan Ali", role: "Sous Chef", img: "/assets/chef-3.jpg", bio: "Expert in Asian fusion cuisine with a modern twist on traditional flavors." },
  { name: "Fatima Noor", role: "Nutrition Expert", img: "/assets/chef-4.jpg", bio: "Certified nutritionist ensuring every meal is balanced, healthy, and delicious." },
];

export default function TeamPage() {
  return (
    <Box>
      <PageBanner title="OUR TEAM" />
      <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        <Box textAlign="center" mb={12}>
          <Text fontSize="sm" color="#00813d" fontWeight="bold" mb={2}>THE CHEFS</Text>
          <Text className={oswald700.className} fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            Meet Our Expert Team
          </Text>
          <Text color="gray.500" mt={3} maxW="600px" mx="auto">
            Our talented team of chefs and nutritionists work together to bring you the most delicious and healthy meals.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {team.map((member) => (
            <Box key={member.name} bg="white" borderRadius="16px" overflow="hidden" boxShadow="md" _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Box position="relative" h="250px" overflow="hidden">
                <Image src={member.img} alt={member.name} w="100%" h="100%" objectFit="cover" />
                <Box position="absolute" bottom={0} left={0} right={0} bg="linear-gradient(transparent, rgba(0,0,0,0.7))" p={4} pt={8}>
                  <Flex gap={3}>
                    <Box bg="white" w="32px" h="32px" borderRadius="50%" display="flex" alignItems="center" justifyContent="center" cursor="pointer" _hover={{ bg: "#00813d", color: "white" }}>
                      <FaFacebookF size={14} />
                    </Box>
                    <Box bg="white" w="32px" h="32px" borderRadius="50%" display="flex" alignItems="center" justifyContent="center" cursor="pointer" _hover={{ bg: "#00813d", color: "white" }}>
                      <FaTwitter size={14} />
                    </Box>
                    <Box bg="white" w="32px" h="32px" borderRadius="50%" display="flex" alignItems="center" justifyContent="center" cursor="pointer" _hover={{ bg: "#00813d", color: "white" }}>
                      <FaInstagram size={14} />
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Box p={5} textAlign="center">
                <Text fontWeight="bold" fontSize="lg">{member.name}</Text>
                <Text color="#00813d" fontWeight="bold" fontSize="sm" mb={2}>{member.role}</Text>
                <Text color="gray.500" fontSize="sm">{member.bio}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
