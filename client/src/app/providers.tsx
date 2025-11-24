"use client";

import StoreProvider from "@/state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import AuthProvider from "./(auth)/authProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AuthProvider>
        <Authenticator.Provider>
          {children}
        </Authenticator.Provider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default Providers;