import { Box, Image, Text } from "@chakra-ui/react";
import { patrickHand } from "@/lib/fonts";

type PageBannerProps = {
  title: string;
  imageSrc?: string;
};

export default function PageBanner({ title, imageSrc = "assets/con-banner.jpg" }: PageBannerProps) {
  return (
    <Box position="relative" w="100%">
      <Image
        alt={title}
        w="100%"
        h={{ base: "220px", sm: "300px", md: "400px", lg: "500px" }}
        objectFit="cover"
        src={imageSrc}
      />
      <Text
        className={patrickHand.className}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        fontSize={{ base: "32px", sm: "50px", md: "70px", lg: "80px" }}
        textAlign="center"
        whiteSpace="nowrap"
      >
        {title}
      </Text>
    </Box>
  );
}
