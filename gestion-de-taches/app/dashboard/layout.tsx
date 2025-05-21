"use client"

import { TaskProvider } from "@/context/task-context"
import { AuthProvider } from "@/context/auth-context"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <TaskProvider>
        <SidebarProvider>
          <div className="flex min-h-screen flex-col">
            <DashboardHeader />
            <div className="flex flex-1">
              <DashboardSidebar />
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </TaskProvider>
    </AuthProvider>
  )
}