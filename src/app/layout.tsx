import type { Metadata } from "next";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import "./globals.css";
import { appConfig } from "@/app-config";
import SettingsModal from "@/containers/Settings/SettingsModal";
import Settings from "@/containers/Settings";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans", fontSans.variable)}>
        <SessionProvider>
          {children}
          <Toaster position="bottom-center" richColors />
          <SettingsModal>
            <Settings />
          </SettingsModal>
        </SessionProvider>
      </body>
    </html>
  );
}
