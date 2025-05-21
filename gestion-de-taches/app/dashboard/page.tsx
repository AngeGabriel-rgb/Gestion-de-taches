"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { useTasks } from "@/context/task-context"
import { CheckCircle, Clock, ListTodo, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { TaskList } from "@/components/dashboard/task-list"

export default function DashboardPage() {
  const { user } = useAuth()
  const { tasks, isLoading, fetchTasks } = useTasks()
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  })

  useEffect(() => {
    if (user) {
      fetchTasks()
    }
  }, [user, fetchTasks])

  useEffect(() => {
    if (tasks) {
      const completed = tasks.filter((task) => task.status === "completed").length
      setStats({
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
      })
    }
  }, [tasks])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue, {user?.name}. Voici un aperçu de vos tâches.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tâches totales</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tâches terminées</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tâches en cours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Tâches récentes</h2>
        <TaskList tasks={tasks.slice(0, 5)} showActions={false} />
      </div>
    </div>
  )
}
