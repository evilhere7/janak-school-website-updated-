import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Shree Janak Secondary School | JHSS Gaindakot, Nawalparasi",
    template: "%s | JHSS",
  },
  description:
    "Official website of Shree Janak Secondary School (JHSS) — a premier educational institution in Gaindakot-5, Nawalparasi, Nepal. Serving 1,500+ students from Play Group to Class 12 in English and Nepali medium since 2015 B.S.",
  keywords: [
    "Janak Secondary School",
    "JHSS",
    "Gaindakot",
    "Nawalparasi",
    "Nepal school",
    "SEE",
    "+2 Science Management Humanities",
  ],
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://jhss.edu.np",
    siteName: "Shree Janak Secondary School",
    title: "Shree Janak Secondary School | JHSS",
    description:
      "Premium educational institution in Gaindakot-5, Nawalparasi, Nepal. Quality education for all since 2015 B.S.",
    images: [{ url: "/assets/logo/jhss-logo3_1.png" }],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://jhss.edu.np"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
