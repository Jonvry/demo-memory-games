import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "./lib/utils";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const SITE_NAME = "Memory Game";
const SITE_DESCRIPTION =
    "A fun memory matching card game — flip cards and find all matching pairs!";
const SITE_URL = "https://demo-memory-game.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        template: `%s | ${SITE_NAME}`,
        default: SITE_NAME,
    },
    description: SITE_DESCRIPTION,
    keywords: [SITE_NAME],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: {
        locale: "en-US",
        type: "website",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={cn(geistSans.variable, geistMono.variable, "antialiased")}>
                {children}
            </body>
        </html>
    );
}
