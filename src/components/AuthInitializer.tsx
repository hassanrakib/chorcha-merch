"use client";

import { useEffect, useState } from "react";
import { setupAuthToken } from "@/lib/auth";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = await setupAuthToken();

      console.log(token);
      setReady(true);
    };

    initAuth();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Initializing secure session...
      </div>
    );
  }

  return <>{children}</>;
}
