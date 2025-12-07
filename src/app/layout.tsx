import type { Metadata } from "next";
import {
  Inter,
  Open_Sans,
  Noto_Sans_JP,
  Zen_Kaku_Gothic_Antique,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LogPath } from "@/components/feature/log-path";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { SessionProvider } from "next-auth/react";
import { ModalArticlePreview } from "@/components/feature/modal/modal-article-preview";
import { ModalArticleRequests } from "@/components/feature/modal/modal-article-requests";
import { ModalUserEvents } from "@/components/feature/modal";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-notosans",
  preload: false,
});

const zenKakuGothicAntique = Zen_Kaku_Gothic_Antique({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zenkaku",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ミヤスポ - 西宮のスポーツと健康を応援するニュースサイト｜MIYASPO",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${openSans.variable} ${notoSans.variable} ${zenKakuGothicAntique.variable}`}
      >
        <Script
          src="https://yubinbango.github.io/yubinbango/yubinbango.js"
          strategy="afterInteractive"
        />
        <SessionProvider>
          {children}
          <Toaster />
          <LogPath />
          <ModalMessage />
          <ModalArticlePreview />
          <ModalArticleRequests />
          <ModalUserEvents />
        </SessionProvider>
      </body>
    </html>
  );
}
