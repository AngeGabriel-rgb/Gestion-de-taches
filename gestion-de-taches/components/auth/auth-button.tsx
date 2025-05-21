"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface AuthButtonProps {
  type?: "button" | "submit" | "reset"
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  onClick?: () => void
  fullWidth?: boolean
  className?: string
}

export function AuthButton({
  type = "button",
  isLoading = false,
  disabled = false,
  children,
  variant = "primary",
  onClick,
  fullWidth = false,
  className,
}: AuthButtonProps) {
  const baseClasses = "relative flex items-center justify-center rounded-lg py-3.5 px-6 font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 focus:ring-blue-500",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 focus:ring-slate-500",
    outline: "bg-transparent text-slate-700 border-2 border-slate-200 hover:bg-slate-50 active:bg-slate-100 focus:ring-slate-500"
  }
  
  const widthClass = fullWidth ? "w-full" : "w-auto"
  
  const disabledClasses = "opacity-70 cursor-not-allowed"
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        widthClass,
        (isLoading || disabled) && disabledClasses,
        "overflow-hidden",
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <span className={cn(isLoading && "opacity-0")}>{children}</span>
    </button>
  )
}