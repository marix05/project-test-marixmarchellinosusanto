import { Roboto } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// theme provider
import { ThemeProvider } from "@/components/ThemeProvider";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Suitmedia",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
