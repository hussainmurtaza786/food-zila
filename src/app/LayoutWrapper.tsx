"use client";

import { Box } from "@chakra-ui/react";
import Navbar from "@/components/HomePage/Navbar";
import Footer from "@/components/HomePage/Footer";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/admin");

  return (
    <Box>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </Box>
  );
}
