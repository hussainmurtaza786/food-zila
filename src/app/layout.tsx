"use client"

import { Inter } from "next/font/google";
import Provider from "./provider";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/HomePage/Navbar";
import Footer from "@/components/HomePage/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout(props: {
  children: React.ReactNode;
}) {



  const pathname = usePathname()

  const hideLayout = pathname.startsWith("/admin")

  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <Box>

            {!hideLayout && <Navbar />}
            {props.children}
            {!hideLayout && <Footer />}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
