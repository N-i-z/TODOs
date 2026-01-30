"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

export function SyncUser() {
  const { user, isSignedIn } = useUser();
  const didSync = useRef(false);

  useEffect(() => {
    if (!isSignedIn || !user || didSync.current) return;

    const email = user.primaryEmailAddress?.emailAddress;
    const name = user.fullName || user.firstName || undefined;
    if (!email) return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    fetch(`${API_URL}/users/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
      credentials: "include",
    })
      .then(() => {
        didSync.current = true;
      })
      .catch(() => {});
  }, [isSignedIn, user]);

  return null;
}
