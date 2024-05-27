"use client"
import { SessionProvider } from "next-auth/react";

export const SessionAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};