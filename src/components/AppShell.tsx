"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import MotionProvider from "./MotionProvider";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <MotionProvider>
      <LoadingScreen minLoadTime={1000}>
        <Header />
        {children}
        <Footer />
      </LoadingScreen>
    </MotionProvider>
  );
}
