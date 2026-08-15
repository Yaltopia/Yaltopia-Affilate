import type { Metadata } from "next";
import { Noto_Sans_Ethiopic, Poppins } from "next/font/google";

import { LocaleHydrate } from "@/components/i18n/locale-hydrate";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yaltopia Affiliate by Prime Store",
  description:
    "Advertisers brief creators. Creators promote with a code and a link. Built from an idea by Prime Store.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoEthiopic.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <LocaleHydrate />
        {children}
      </body>
    </html>
  );
}
