"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useTheme } from "next-themes"

export function TaskDistributionChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const statusData = [
    { name: "En attente", value: 30 },
    { name: "En cours", value: 45 },
    { name: "Terminé", value: 25 },
  ]

  const priorityData = [
    { name: "Haute", value: 35 },
    { name: "Moyenne", value: 40 },
    { name: "Basse", value: 25 },
  ]

  const COLORS = ["#FF914D", "#9B1B1B", "#38BDF8", "#4ADE80"]

  if (!mounted) {
    return <div className="h-full w-full flex items-center justify-center">Chargement du graphique...</div>
  }

  const textColor = theme === "dark" ? "#f8fafc" : "#0f172a"

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 h-full">
        <div className="h-full">
          <p className="text-center text-sm font-medium mb-2">Par statut</p>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                  color: textColor,
                  border: "1px solid #e2e8f0",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="h-full">
          <p className="text-center text-sm font-medium mb-2">Par priorité</p>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                  color: textColor,
                  border: "1px solid #e2e8f0",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
