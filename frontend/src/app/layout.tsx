import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./index.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Vishal | Full-Stack Architect",
  description: "Engineering scalable digital experiences with MERN stack excellence and high-fidelity product design.",
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import NavVisibilityWrapper from "@/components/NavVisibilityWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-[#fafafa] font-body text-slate-900 antialiased selection:bg-accent selection:text-white",
        inter.variable,
        outfit.variable
      )}>
        <Providers>
          <NavVisibilityWrapper>
            {children}
          </NavVisibilityWrapper>
        </Providers>
      </body>
    </html>
  );
}
