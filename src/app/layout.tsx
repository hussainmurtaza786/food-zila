import { Inter } from "next/font/google";
import Provider from "./provider";
import LayoutWrapper from "./LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <LayoutWrapper>{props.children}</LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}
