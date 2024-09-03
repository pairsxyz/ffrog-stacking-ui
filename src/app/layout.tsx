import type { Metadata } from "next";
import { cooper } from "@/styles/fonts";
import "../styles/globals.css";
import { Web3ModalProvider, ProgramProvider } from "@/providers";

export const metadata: Metadata = {
  title: "ffrog",
  description: "ffrog",
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
        </Web3ModalProvider>
      </body>
    </html>
  );
}
