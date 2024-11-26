import { Inter } from "next/font/google";
import Provider from "./provider";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/HomePage/Navbar";
import Footer from "@/components/HomePage/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <Box >
            <Navbar />
            {children}
          </Box>
          {/* <Footer /> */}
        </Provider>
      </body>
    </html>
  );
}
