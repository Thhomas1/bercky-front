import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "./lib/utils";
import BottomBar from "./BottomBar";

const paquito = localFont({
  src: [
    {
      path: "../public/fonts/Paquito-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Paquito-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Paquito-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-paquito",
  display: "swap",
});

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bercky",
  description: "Gracias Martin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        notoSans.variable,
        playfairDisplayHeading.variable,
        paquito.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-screen flex-col">
          <div className="mx-auto max-w-7xl p-5">{children}</div>
          <BottomBar />
        </div>
      </body>
    </html>
  );
}