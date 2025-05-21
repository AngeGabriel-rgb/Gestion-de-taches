"use client"

import type React from "react"
import { motion } from "framer-motion"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <motion.main
            className="flex-1 p-4 md:p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  )
}