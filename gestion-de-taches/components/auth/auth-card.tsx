"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DivideIcon as LucideIcon } from "lucide-react"
import { motion, useAnimation } from "framer-motion"

interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  icon?: LucideIcon
  backLink?: string
  backText?: string
  className?: string
}

export function AuthCard({
  title,
  subtitle,
  children,
  icon: Icon,
  backLink,
  backText,
  className,
}: AuthCardProps) {
  const controls = useAnimation()
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    })
  }, [controls])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-200 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className={cn(
          "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden relative z-10",
          className
        )}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-bl-full opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-tr-full opacity-70"></div>
        
        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-6">
            {Icon && (
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-md">
                <Icon className="w-8 h-8 text-white" />
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-slate-500">{subtitle}</p>
            )}
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Back link */}
          {backLink && (
            <div className="mt-6 text-center">
              <Link
                href={backLink}
                className="inline-flex items-center text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {backText || "Retour"}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}