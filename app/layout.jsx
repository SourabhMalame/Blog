import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "MSO - Maharashtra Startup Organistation",
  description:
    "A modern blog platform focused on sharing knowledge, insights, and stories about web development, technology, and design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
