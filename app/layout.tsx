import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastContext from "@/context/ToastContext";
import AuthContext from "@/context/AuthContext";
import ActiveStatus from "@/components/avatar/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger",
  description: "Messenger",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToastContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
