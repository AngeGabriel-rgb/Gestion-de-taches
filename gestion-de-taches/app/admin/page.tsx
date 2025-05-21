"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCards } from "@/components/admin/stats-cards"
import { ActivityLog } from "@/components/admin/activity-log"
import { RecentUsers } from "@/components/admin/recent-users"
import { RecentTasks } from "@/components/admin/recent-tasks"
import { UsageChart } from "@/components/admin/usage-chart"
import { TaskDistributionChart } from "@/components/admin/task-distribution-chart"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre application et des activités récentes.</p>
      </div>

      <motion.div variants={item}>
        <StatsCards />
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Utilisation quotidienne</CardTitle>
                  <CardDescription>Nombre de connexions et de tâches créées par jour</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <UsageChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution des tâches</CardTitle>
                  <CardDescription>Par statut et priorité</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <TaskDistributionChart />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Utilisateurs récents</CardTitle>
                  <CardDescription>Les 5 derniers utilisateurs inscrits</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentUsers />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tâches récentes</CardTitle>
                  <CardDescription>Les 5 dernières tâches créées</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTasks />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytiques détaillées</CardTitle>
                <CardDescription>Tendances et métriques d'utilisation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Graphiques analytiques détaillés à venir</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Journal d'activité</CardTitle>
                <CardDescription>Activités récentes sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityLog />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
