import { Inter } from "next/font/google";
import Provider from "./provider";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/HomePage/Navbar";
import Footer from "@/components/HomePage/Footer";
import { headers } from "next/headers";
import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   // Reconstruct the full URL
//   const host = req.headers.host;
//   const protocol = req.headers['x-forwarded-proto'] || 'http';
//   const fullUrl = `${protocol}://${host}${req.url}`;

//   return {
//     props: { fullUrl }, // Pass this prop to your page component
//   };
// }; 

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout(props: {
  children: React.ReactNode;
}) {


  console.log(" ========= `headers` =========")
  const Header = headers().forEach((value, key) => {
    // console.log(key, ":", value);
    // console.log("Key ==>", key)
  });
  // console.log("Header==>", Header)
  const path = headers().get('referer') // returns path like http://localhost:3000/admin
  const host = headers().get('host') // returns string like localhost:3000

  const isAdminPage = Boolean(host && path && path?.includes(`${host}/admin`));
  // console.log("is")
  console.log("Props ==>", props)

  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <Box>

            {!isAdminPage && <Navbar />}
            {props.children}
            {!isAdminPage && <Footer />}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
