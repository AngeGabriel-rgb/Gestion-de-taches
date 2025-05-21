"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"

export function UsageChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = [
    { name: "Lun", connexions: 40, taches: 24 },
    { name: "Mar", connexions: 30, taches: 13 },
    { name: "Mer", connexions: 20, taches: 28 },
    { name: "Jeu", connexions: 27, taches: 39 },
    { name: "Ven", connexions: 18, taches: 48 },
    { name: "Sam", connexions: 23, taches: 38 },
    { name: "Dim", connexions: 34, taches: 43 },
  ]

  if (!mounted) {
    return <div className="h-full w-full flex items-center justify-center">Chargement du graphique...</div>
  }

  const textColor = theme === "dark" ? "#f8fafc" : "#0f172a"
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" stroke={textColor} />
        <YAxis stroke={textColor} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            color: textColor,
            border: `1px solid ${gridColor}`,
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="connexions" stroke="#9B1B1B" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="taches" stroke="#FF914D" />
      </LineChart>
    </ResponsiveContainer>
  )
}
