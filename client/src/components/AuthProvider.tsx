"use client";

import { Amplify } from "aws-amplify";
import amplifyConfig from "@/amplifyconfiguration";
import { useEffect } from "react";

Amplify.configure(amplifyConfig, { ssr: true });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Configure Amplify on client side
    Amplify.configure(amplifyConfig, { ssr: true });
  }, []);

  return <>{children}</>;
}
