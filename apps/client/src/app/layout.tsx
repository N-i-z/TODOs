import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "@/src/styles/globals.css";
import { Toaster } from "sonner";
import { SyncUser } from "../hooks/SyncUser";

export const metadata: Metadata = {
  title: "ToDos App",
  description: "A simple ToDos application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="flex justify-end items-center px-4 gap-4 h-16">
            <div>
              {/* Show the sign-in and sign-up buttons when the user is signed out */}
              <SignedOut>
                <SignInButton />
              </SignedOut>
              {/* Show the user button when the user is signed in */}
              <SignedIn>
                <SyncUser />
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
