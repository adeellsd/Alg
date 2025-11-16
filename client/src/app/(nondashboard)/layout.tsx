import { NAVBAR_HEIGHT } from '@/lib/constants'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout