"use client";

import { AuthPayload } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// export const SessionContext = createContext(null);
// Type the context explicitly; initially undefined

interface SessionContextType {
  user: AuthPayload;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionContextProvider = ({
  session,
  children,
}: {
  session: SessionContextType;
  children: React.ReactNode;
}) => {
  const [session2, setSession2] = useState<SessionContextType | null>(session);
  const router = useRouter();
  const refetchSession = async () => {
    try {
      const res = await fetch("/api/session");

      if (!res.ok) {
        setSession2(null); // 🔥 force rerender
        router.refresh(); // optional (App Router)
        return;
      }

      const data = await res.json();
      setSession2(data);
    } catch {
      setSession2(null);
    }
  };

  useEffect(() => {
    refetchSession();
  }, []);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

// export const useSession = () => useContext(SessionContext);

// Hook to access session with safety check
export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionContextProvider");
  }
  return context;
};
