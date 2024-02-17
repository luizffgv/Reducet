import { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "@/components/navbar/navbar";
import "@/sass/global.scss";
import styles from "./layout.module.scss";
import { Atkinson_Hyperlegible, Source_Code_Pro } from "next/font/google";
import { SITE_NAME } from "@/constants";
import { BASE_URL } from "@/env";
import { NextIntlClientProvider } from "next-intl";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-atkinson",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "A personal blog for programming-related topics.",
  openGraph: {
    type: "website",
    title: SITE_NAME,
    url: BASE_URL,
    // TODO image
    siteName: SITE_NAME,
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      className={`${atkinson.variable} ${sourceCodePro.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className={styles.body}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main id="main" className={styles.main}>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
