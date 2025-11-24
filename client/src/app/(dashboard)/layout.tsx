"use client";

import React, { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { useGetAuthUserQuery } from '@/state/api';
import type { AccountTier } from '@/types/prismaTypes';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();
  const { data: authUser, isLoading: isLoadingUser } = useGetAuthUserQuery();

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (authStatus === 'unauthenticated') {
      router.push(`/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [authStatus, router, pathname]);

  // Show loading while checking auth or fetching user data
  if (authStatus === 'configuring' || authStatus === 'unauthenticated' || isLoadingUser || !authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  const accountTier: AccountTier = authUser.userInfo.accountTier;

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar accountTier={accountTier} userInfo={authUser.userInfo} />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 glass-standard px-4">
          <SidebarTrigger />
          <div className="flex-1" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 bg-off-white">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
