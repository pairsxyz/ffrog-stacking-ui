import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });

export const cooper = localFont({
  src: [
    {
      path: "./cooper/CooperFiveOpti-Black.otf",
      weight: "400",
      style: "normal",
    },
  ],
});
