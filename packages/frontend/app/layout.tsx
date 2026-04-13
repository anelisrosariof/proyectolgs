import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "./components/layout-shell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Luxury Grand Stage",
  description:
    "Sistema de gestión de eventos, reservas y facturación de Luxury Grand Stage.",
  icons: {
    icon: "/lgs_logo512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
