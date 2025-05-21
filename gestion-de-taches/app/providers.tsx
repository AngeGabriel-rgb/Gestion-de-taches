"use client"

import type React from "react"

import { AuthProvider } from "@/context/auth-context"
import { TaskProvider } from "@/context/task-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TaskProvider>{children}</TaskProvider>
    </AuthProvider>
  )
}
