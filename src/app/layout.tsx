import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Burócrata — Videojuego Educativo de Gobierno Electrónico",
  description:
    "Aprende administración pública, gobierno electrónico y ética pública tomando decisiones como funcionario del Estado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
