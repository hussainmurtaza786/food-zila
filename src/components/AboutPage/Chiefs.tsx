import { Box, Image, Text } from "@chakra-ui/react";
import { oswald400 } from "@/lib/fonts";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const chefs = [
  { image: "assets/chief-1.jpg", role: "Head Chef", name: "Leslie Alexander" },
  { image: "assets/chief-2.jpg", role: "Sr Table Manager", name: "Henry Lucas" },
  { image: "assets/chief-3.jpg", role: "Senior Cook", name: "Mateo Levi" },
];

const socialIcons = [
  { Icon: FaFacebook, label: "Facebook" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaTwitter, label: "Twitter" },
  { Icon: FaYoutube, label: "YouTube" },
];

export default function Chief() {
  return (
    <Box px={{ base: 4, md: 10 }} py={{ base: 10, md: 16 }}>
      <Text
        textAlign="center"
        fontSize={{ base: "28px", sm: "36px", md: "50px", lg: "60px" }}
        className={oswald400.className}
        fontWeight="bold"
        mb={{ base: 8, md: 12 }}
      >
        MEET OUR EXPERT CHEFS
      </Text>

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={{ base: 8, md: 6 }}
      >
        {chefs.map((chef) => (
          <Box key={chef.name} textAlign="center">
            <Box position="relative" borderRadius="12px" overflow="hidden" role="group">
              <Image
                alt={chef.name}
                src={chef.image}
                w={{ base: "280px", sm: "320px", md: "100%" }}
                transition="0.3s"
                _groupHover={{ opacity: 0.6 }}
              />

              <Box
                position="absolute"
                bottom="15px"
                left="50%"
                transform="translateX(-50%)"
                display="flex"
                gap="12px"
                color="white"
                opacity="0"
                transition="0.3s"
                _groupHover={{ opacity: 1 }}
              >
                {socialIcons.map(({ Icon, label }) => (
                  <Icon key={label} size="22px" />
                ))}
              </Box>
            </Box>

            <Box mt={4}>
              <Text color="#00813d" fontWeight="semibold">
                {chef.role}
              </Text>
              <Text className={oswald400.className} fontSize="24px" fontWeight="bold">
                {chef.name}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
