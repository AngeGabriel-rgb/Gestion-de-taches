"use client"

import type { Task } from "@/types/task"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"
import { TaskDialog } from "./task-dialog"
import { useTasks } from "@/context/task-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type TaskListProps = {
  tasks: Task[]
  showActions?: boolean
}

export function TaskList({ tasks, showActions = true }: TaskListProps) {
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null)
  const { deleteTask } = useTasks()

  const handleEdit = (task: Task) => {
    setEditTask(task)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteTaskId(id)
  }

  const confirmDelete = async () => {
    if (deleteTaskId) {
      await deleteTask(deleteTaskId)
      setDeleteTaskId(null)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-warning text-warning-foreground"
      case "low":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground"
      case "in-progress":
        return "bg-info text-info-foreground"
      case "pending":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé"
      case "in-progress":
        return "En cours"
      case "pending":
        return "En attente"
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return priority
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucune tâche trouvée</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <Badge className={getPriorityColor(task.priority)}>{getPriorityLabel(task.priority)}</Badge>
              </div>
              <CardDescription className="line-clamp-2">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Statut:</span>
                  <Badge className={getStatusColor(task.status)}>{getStatusLabel(task.status)}</Badge>
                </div>
                {task.dueDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Échéance:</span>
                    <span className="text-sm">
                      {format(new Date(task.dueDate), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
            {showActions && (
              <CardFooter className="pt-2">
                <div className="flex justify-end gap-2 w-full">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {editTask && <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} task={editTask} />}

      <AlertDialog open={!!deleteTaskId} onOpenChange={() => setDeleteTaskId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cette tâche sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
