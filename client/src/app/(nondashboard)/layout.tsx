"use client";

import { NAVBAR_HEIGHT } from '@/lib/constants'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import React from 'react'
import { useGetAuthUserQuery } from '@/state/api'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser } = useGetAuthUserQuery();
  console.log("authUser", authUser);
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout