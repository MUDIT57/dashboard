"use client";
import { SessionProvider } from "next-auth/react";
import ReduxProvider from "../components/ReduxProvider";
import GlobalFetchWrapper from "@/components/GlobalFetchWrapper";
import { BookmarkProvider } from "../context/BookmarkContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider>
        <GlobalFetchWrapper />
        <BookmarkProvider>{children}</BookmarkProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
