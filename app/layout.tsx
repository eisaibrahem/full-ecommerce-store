import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Urbanist } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { ThemeProvider } from "@/components/theme-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "eistore",
  description: "eistore - The place for all your purchases.",

  icons: {
    icon: "/eistore_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider />
            <ToastProvider />
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
