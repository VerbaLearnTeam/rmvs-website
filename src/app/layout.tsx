import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { generateOrganizationSchema } from "@/lib/structured-data";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rmvs.org"),
  title: {
    default: "RMVS | Digital Innovation Lab — AI-Integrated Products",
    template: "%s | RMVS",
  },
  description:
    "RMonaghan Venture Studios is a digital innovation lab specializing in AI-integrated iOS apps, developer tooling, clinical AI, and end-to-end product development. Based in Pittsburgh, PA.",
  keywords: [
    "RMVS",
    "RMonaghan Venture Studios",
    "AI",
    "iOS development",
    "developer tools",
    "clinical AI",
    "venture studio",
    "Pittsburgh",
  ],
  authors: [{ name: "Rory Monaghan", url: "https://www.rmvs.org/about" }],
  creator: "Rory Monaghan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rmvs.org",
    siteName: "RMVS — RMonaghan Venture Studios",
    title: "RMVS | Digital Innovation Lab — AI-Integrated Products",
    description:
      "Digital innovation lab specializing in AI-integrated iOS apps, developer tooling, clinical AI, and end-to-end product development.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "RMVS — RMonaghan Venture Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RMVS | Digital Innovation Lab",
    description:
      "AI-integrated iOS apps, developer tooling, clinical AI, and end-to-end product development.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.rmvs.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('rmvs-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}})()`,
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="RMVS Engineering Blog" href="/feed.xml" />
      </head>
      <body className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
