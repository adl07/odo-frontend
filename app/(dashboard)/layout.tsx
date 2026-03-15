"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
    
  
    useEffect(()=>{
      if(!isAuthenticated()){
      return router.replace("/login")
    } else{
      setIsLoading(false)
    }
    },[router])
  
    if (isLoading) {
      return null // o un spinner de carga
    }
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
function isAuthetication() {
  throw new Error("Function not implemented.")
}

