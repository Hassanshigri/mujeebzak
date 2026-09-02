import "./globals.css";
import { site } from "@/data/wedding.config";

export const metadata = {
  title: `${site.groomFirst} & ${site.brideFirst} — Wedding Invitation`,
  description: "A private invitation to our wedding celebrations. In shā' Allāh.",
  openGraph: {
    title: `${site.groomFirst} & ${site.brideFirst}`,
    description: "A private invitation to our wedding celebrations.",
    type: "website",
  },
  robots: { index: false, follow: false }, // private invite — keep out of search
};

export const viewport = { themeColor: "#1A0508" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;600&family=Alex+Brush&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
