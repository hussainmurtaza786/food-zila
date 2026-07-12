"use client";

import { Box, Text, SimpleGrid, Image, Badge } from "@chakra-ui/react";
import PageBanner from "@/components/common/PageBanner";

const newsItems = [
  { title: "New Summer Menu Launch", date: "June 15, 2026", tag: "Menu", desc: "Check out our exciting new summer menu with refreshing drinks and light meals perfect for hot days.", img: "/assets/burger.png" },
  { title: "50% Off on All Pizzas", date: "June 10, 2026", tag: "Offers", desc: "Enjoy half price on all pizza orders this weekend. Don't miss out on this amazing deal!", img: "/assets/pizza-deal.png" },
  { title: "FoodZila Now in Lahore", date: "June 5, 2026", tag: "News", desc: "We're excited to announce our expansion to Lahore. Order now and get free delivery on your first order.", img: "/assets/delivery-man.png" },
  { title: "Healthy Eating Tips", date: "May 28, 2026", tag: "Blog", desc: "Discover our top tips for eating healthy while still enjoying delicious food from our menu.", img: "/assets/sushi.webp" },
  { title: "Customer Appreciation Week", date: "May 20, 2026", tag: "Events", desc: "Join us for a week of special deals, giveaways, and exclusive rewards for our loyal customers.", img: "/assets/biryani.png" },
  { title: "Behind the Kitchen", date: "May 15, 2026", tag: "Blog", desc: "Take a sneak peek behind the scenes at how our chefs prepare your favorite meals with love.", img: "/assets/fries.png" },
];

const tagColors: Record<string, string> = { Menu: "green", Offers: "red", News: "blue", Blog: "purple", Events: "orange" };

export default function NewsPage() {
  return (
    <Box>
      <PageBanner title="LATEST NEWS" />
      <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {newsItems.map((item) => (
            <Box key={item.title} bg="white" borderRadius="16px" overflow="hidden" boxShadow="md" _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }} transition="all 0.3s">
              <Box position="relative">
                <Image src={item.img} alt={item.title} w="100%" h="200px" objectFit="cover" />
                <Badge position="absolute" top={3} left={3} colorScheme={tagColors[item.tag] || "gray"} borderRadius="full" px={3} py={1} fontSize="xs">
                  {item.tag}
                </Badge>
              </Box>
              <Box p={5}>
                <Text fontSize="sm" color="gray.400" mb={2}>{item.date}</Text>
                <Text fontWeight="bold" fontSize="lg" mb={2}>{item.title}</Text>
                <Text color="gray.500" fontSize="sm" noOfLines={3}>{item.desc}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
