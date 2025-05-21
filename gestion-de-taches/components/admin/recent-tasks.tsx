"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

interface Task {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  priority: "high" | "medium" | "low";
  user: string;
  createdAt: string;
}

interface RecentTasksProps {
  tasks?: Task[];
}

export function RecentTasks({ tasks = [] }: RecentTasksProps) {
  // Valeurs par défaut si aucune tâche n'est fournie
  const defaultTasks: Task[] = [
    {
      id: "1",
      title: "Aucune tâche récente",
      status: "pending",
      priority: "low",
      user: "Système",
      createdAt: "Maintenant",
    },
  ];

  const displayedTasks = tasks.length > 0 ? tasks : defaultTasks;

  const statusConfig = {
    completed: {
      color: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
      label: "Terminé"
    },
    "in-progress": {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
      label: "En cours"
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
      label: "En attente"
    }
  };

  const priorityConfig = {
    high: {
      color: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
      label: "Haute"
    },
    medium: {
      color: "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100",
      label: "Moyenne"
    },
    low: {
      color: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
      label: "Basse"
    }
  };

  return (
    <div className="space-y-4">
      {displayedTasks.map((task, index) => (
        <motion.div
          key={task.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 last:border-0 last:pb-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className="space-y-1">
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-muted-foreground">
              Par {task.user} • {task.createdAt}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={statusConfig[task.status].color}>
              {statusConfig[task.status].label}
            </Badge>
            
            <Badge variant="outline" className={priorityConfig[task.priority].color}>
              {priorityConfig[task.priority].label}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                <DropdownMenuItem>Modifier</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      ))}
    </div>
  )
}