"use client"

import React, { useState } from "react"
import { Eye, EyeOff, DivideIcon as LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormInputProps {
  id: string
  name: string
  type: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  icon?: LucideIcon
  autoComplete?: string
}

export function FormInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  error,
  disabled,
  icon: Icon,
  autoComplete,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type
  
  const handleFocus = () => {
    setIsFocused(true)
  }
  
  const handleBlur = () => {
    setIsFocused(false)
  }
  
  const isActive = isFocused || value

  return (
    <div className="relative w-full mb-4">
      <div className="group relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          className={cn(
            "w-full bg-white border-2 rounded-lg py-4 px-4 text-slate-700 placeholder-transparent transition-all duration-200 outline-none",
            Icon ? "pl-12" : "pl-4",
            type === "password" ? "pr-12" : "pr-4",
            error 
              ? "border-red-300 focus:border-red-500" 
              : "border-slate-200 focus:border-blue-500",
            disabled && "opacity-70 cursor-not-allowed bg-slate-100"
          )}
        />
        
        <label
          htmlFor={id}
          className={cn(
            "absolute left-0 transition-all duration-200 pointer-events-none text-slate-400",
            Icon ? "left-12" : "left-4",
            isActive
              ? "-top-2.5 text-xs bg-white px-1 text-blue-500"
              : "top-1/2 transform -translate-y-1/2 text-base",
            error && isActive && "text-red-500"
          )}
        >
          {label}
        </label>
        
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}