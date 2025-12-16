"use client";

import { SessionContextProvider } from "@/context/SessionContext";
import { AuthPayload } from "@/lib/auth";
import store from "@/redux/store";
import { Provider } from "react-redux";

export function Providers({
  session,
  children,
}: {
  session: { user: AuthPayload };
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <SessionContextProvider session={session}>
        {children}
      </SessionContextProvider>
    </Provider>
  );
}
