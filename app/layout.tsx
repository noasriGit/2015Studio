import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNeueBlack = localFont({
  src: "../public/HelveticaNeueBlack.otf",
  variable: "--font-helvetica-neue-black",
  display: "swap",
});

export const metadata: Metadata = {
  title: "20/15 Studios | Premium Recording Studio",
  description: "Book your next recording session at 20/15 Studios. Professional mixing, mastering, recording, and podcast production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNeueBlack.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
