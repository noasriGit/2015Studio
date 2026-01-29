import type { Metadata } from "next";
import { Tilt_Warp } from "next/font/google";
import "./globals.css";

const tiltWarp = Tilt_Warp({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tilt-warp",
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
        className={`${tiltWarp.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
