import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mubashir Qadri - Portfolio",
  description: "Professional portfolio showcasing my experience, projects, and skills in software development",
  keywords: ["portfolio", "developer", "software engineer", "web development", "projects"],
  authors: [{ name: "Mubashir Qadri" }],
  creator: "Mubashir Qadri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
