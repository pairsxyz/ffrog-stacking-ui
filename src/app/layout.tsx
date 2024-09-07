import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { cooper } from "@/styles/fonts";
import "../styles/globals.css";
import { Web3ModalProvider, ProgramProvider } from "@/providers";

export const metadata: Metadata = {
  title: "FFROG Staking",
  description: "FFROG Staking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cooper.className}>
        <Web3ModalProvider>
          <ProgramProvider>{children}</ProgramProvider>
          <Analytics />
        </Web3ModalProvider>
      </body>
    </html>
  );
}
