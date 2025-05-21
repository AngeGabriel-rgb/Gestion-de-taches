"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ListTodo, CheckCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

interface StatsCardsProps {
  stats?: StatCard[];
  loading?: boolean;
}

const defaultStats: StatCard[] = [
  {
    title: "Utilisateurs totaux",
    value: 0,
    icon: Users,
    change: "0%",
    changeType: "neutral"
  },
  {
    title: "Tâches totales",
    value: 0,
    icon: ListTodo,
    change: "0%",
    changeType: "neutral"
  },
  {
    title: "Tâches terminées",
    value: 0,
    icon: CheckCircle,
    change: "0%",
    changeType: "neutral"
  },
  {
    title: "Tâches en cours",
    value: 0,
    icon: Clock,
    change: "0%",
    changeType: "neutral"
  }
]

export function StatsCards({ stats = defaultStats, loading = false }: StatsCardsProps) {
  const displayedStats = stats.length > 0 ? stats : defaultStats

  const getChangeColor = (changeType: StatCard['changeType']) => {
    switch (changeType) {
      case "positive": return "text-green-500 dark:text-green-400"
      case "negative": return "text-red-500 dark:text-red-400"
      default: return "text-muted-foreground"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {displayedStats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {typeof stat.value === 'number' 
                      ? stat.value.toLocaleString() 
                      : stat.value}
                  </div>
                  <p className={`text-xs ${getChangeColor(stat.changeType)}`}>
                    {stat.change} depuis le mois dernier
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}