import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "theProblemSolver",
  description: "created by Abhishek Gusain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-zinc-100 text-zinc-900 min-h-screen`}
      >
        <ClerkProvider>
          <Container>
            <Header />
              {children}
            <Footer />
          </Container>
        </ClerkProvider>
      </body>
    </html>
  );
}