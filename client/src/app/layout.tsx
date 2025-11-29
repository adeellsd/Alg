import type { Metadata } from "next";
import { Inter, Poppins, Noto_Sans_Arabic } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

// Base URL for metadata (must be defined before metadata export)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentalg.dz";

export const metadata: Metadata = {
  title: {
    default: "RentAlg - Plateforme immobilière algérienne",
    template: "%s | RentAlg",
  },
  description: "Trouvez votre bien idéal en Algérie. Des milliers d'annonces vérifiées pour acheter, louer ou investir dans l'immobilier algérien.",
  keywords: [
    "immobilier algérie",
    "location appartement alger",
    "vente maison algérie",
    "annonces immobilières algérie",
    "wilaya",
    "F3",
    "F4",
    "villa",
    "terrain",
  ],
  authors: [{ name: "RentAlg" }],
  creator: "RentAlg",
  publisher: "RentAlg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "RentAlg - Plateforme immobilière algérienne",
    description: "Trouvez votre bien idéal en Algérie. Des milliers d'annonces vérifiées pour acheter, louer ou investir.",
    url: siteUrl,
    siteName: "RentAlg",
    locale: "fr_DZ",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RentAlg - Immobilier Algérie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RentAlg - Plateforme immobilière algérienne",
    description: "Trouvez votre bien idéal en Algérie. Des milliers d'annonces vérifiées.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when available
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${notoSansArabic.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}