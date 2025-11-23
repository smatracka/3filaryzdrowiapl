import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3 Filary Zdrowia - Suplementy, Kosmetyki, Zdrowa Żywność",
  description: "Twoje zdrowie w centrum uwagi. Personalizowane rekomendacje dzięki Harmonia 360°",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
