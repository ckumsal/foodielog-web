import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://foodielog.app"),
  title: "FoodieLog - Public Dish Map",
  description: "Explore public dishes saved by FoodieLog users around the world.",
  applicationName: "FoodieLog",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "FoodieLog - Public Dish Map",
    description: "Explore public dishes saved by FoodieLog users around the world.",
    url: "https://foodielog.app",
    siteName: "FoodieLog",
    images: [{ url: "/app-icon.svg", width: 1024, height: 1024, alt: "FoodieLog app icon" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FoodieLog - Public Dish Map",
    description: "Explore public dishes saved by FoodieLog users around the world.",
    images: ["/app-icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
