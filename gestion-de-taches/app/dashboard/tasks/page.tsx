"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useTasks } from "@/context/task-context"
import { Plus, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { TaskList } from "@/components/dashboard/task-list"
import { TaskDialog } from "@/components/dashboard/task-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { Task } from "@/types/task"

export default function TasksPage() {
  const { user } = useAuth()
  const { tasks, isLoading, fetchTasks } = useTasks()
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    if (user) {
      fetchTasks()
    }
  }, [user, fetchTasks])

  useEffect(() => {
    if (tasks) {
      let filtered = [...tasks]

      // Filter by status
      if (statusFilter !== "all") {
        filtered = filtered.filter((task) => task.status === statusFilter)
      }

      // Filter by priority
      if (priorityFilter !== "all") {
        filtered = filtered.filter((task) => task.priority === priorityFilter)
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (task) => task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query),
        )
      }

      setFilteredTasks(filtered)
    }
  }, [tasks, statusFilter, priorityFilter, searchQuery])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes tâches</h1>
          <p className="text-muted-foreground">Gérez et organisez vos tâches</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle tâche
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher des tâches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les priorités</SelectItem>
              <SelectItem value="low">Basse</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Haute</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <TaskList tasks={filteredTasks} showActions={true} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">Aucune tâche trouvée. Créez votre première tâche !</p>
          <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle tâche
          </Button>
        </div>
      )}

      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
