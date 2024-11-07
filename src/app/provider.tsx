"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Montserrat } from 'next/font/google';
import { Open_Sans } from 'next/font/google';

// Load the fonts
const montserrat = Montserrat({ weight: ['400', '700'], subsets: ['latin'] });
const openSans = Open_Sans({ weight: ['400', '700'], subsets: ['latin'] });

const theme = extendTheme({
  fonts: {
    heading: montserrat.style.fontFamily, // Use the loaded font
    body: openSans.style.fontFamily, // Use the loaded font
  },
  
  colors: {
    brand: {
      black: "#222",
      400: "#ff3346",
      500: "#ff0019",
      600: "#cc0014",
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "brand.400",
          color: "white",
          _hover: {
            bg: "brand.500",
          },
        },
      },
    },
  },
  breakpoints: {
    xs: "320px",
    sm: "375px",
    md: "425px",
    lg: "768px",
    xl: "1024px",
    "2xl": "1440px",
  },
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {props.children}
    </ChakraProvider>
  );
}
