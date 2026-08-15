import type { Metadata } from "next";
import { Noto_Sans_Ethiopic, Poppins } from "next/font/google";

import { LocaleHydrate } from "@/components/i18n/locale-hydrate";
import { AppProviders } from "@/lib/convex/app-providers";
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
  title: "Yaltopia Affiliate",
  description:
    "Advertisers brief creators. Creators promote with a code and a link. Built by Yaltopia Tech.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoEthiopic.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <AppProviders>
          <LocaleHydrate />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
