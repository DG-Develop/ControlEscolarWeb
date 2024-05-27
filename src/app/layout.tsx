import "../styles/globals.scss";
import React from "react";

import { Roboto } from "next/font/google";
import { Metadata } from "next";
import { SessionAuthProvider } from "./providers/SessionAuthProvider";

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "ControlEscolar",
  description:
    "Aplicación para el manejo del personal y alumnado de la escuela X",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}
