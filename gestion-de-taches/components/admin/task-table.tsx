"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

type TaskTableProps = {
  searchQuery: string
  statusFilter: string
  priorityFilter: string
}

export function TaskTable({ searchQuery, statusFilter, priorityFilter }: TaskTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const tasks = [
    {
      id: 1,
      title: "Préparer la présentation",
      description: "Préparer la présentation pour la réunion de lundi",
      status: "in-progress",
      priority: "high",
      user: {
        name: "Sophie Martin",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
      },
      createdAt: "2023-08-15",
      dueDate: "2023-08-20",
    },
    {
      id: 2,
      title: "Réviser le contrat",
      description: "Réviser le contrat avec le service juridique",
      status: "completed",
      priority: "medium",
      user: {
        name: "Camille Bernard",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CB",
      },
      createdAt: "2023-08-10",
      dueDate: "2023-08-15",
    },
    {
      id: 3,
      title: "Finaliser le rapport",
      description: "Finaliser le rapport trimestriel",
      status: "in-progress",
      priority: "high",
      user: {
        name: "Hugo Moreau",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "HM",
      },
      createdAt: "2023-08-05",
      dueDate: "2023-08-18",
    },
    {
      id: 4,
      title: "Mettre à jour le site web",
      description: "Mettre à jour les informations sur le site web",
      status: "pending",
      priority: "low",
      user: {
        name: "Lucas Petit",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "LP",
      },
      createdAt: "2023-08-12",
      dueDate: "2023-08-25",
    },
    {
      id: 5,
      title: "Répondre aux emails",
      description: "Répondre aux emails des clients",
      status: "completed",
      priority: "medium",
      user: {
        name: "Emma Leroy",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EL",
      },
      createdAt: "2023-08-08",
      dueDate: "2023-08-09",
    },
    {
      id: 6,
      title: "Organiser la réunion d'équipe",
      description: "Planifier et organiser la réunion d'équipe hebdomadaire",
      status: "pending",
      priority: "medium",
      user: {
        name: "Thomas Dubois",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "TD",
      },
      createdAt: "2023-08-14",
      dueDate: "2023-08-21",
    },
    {
      id: 7,
      title: "Préparer le budget",
      description: "Préparer le budget pour le prochain trimestre",
      status: "in-progress",
      priority: "high",
      user: {
        name: "Léa Roux",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "LR",
      },
      createdAt: "2023-08-07",
      dueDate: "2023-08-22",
    },
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredTasks = tasks
    .filter((task) => {
      // Filtre par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !task.title.toLowerCase().includes(query) &&
          !task.description.toLowerCase().includes(query) &&
          !task.user.name.toLowerCase().includes(query)
        ) {
          return false
        }
      }

      // Filtre par statut
      if (statusFilter !== "all" && task.status !== statusFilter) {
        return false
      }

      // Filtre par priorité
      if (priorityFilter !== "all" && task.priority !== priorityFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              <Button variant="ghost" onClick={() => handleSort("title")} className="flex items-center gap-1">
                Tâche
                {sortColumn === "title" && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("status")} className="flex items-center gap-1">
                Statut
                {sortColumn === "status" && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("priority")} className="flex items-center gap-1">
                Priorité
                {sortColumn === "priority" && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>
              <span className="flex items-center gap-1">Assigné à</span>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("dueDate")} className="flex items-center gap-1">
                Échéance
                {sortColumn === "dueDate" && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucune tâche trouvée.
              </TableCell>
            </TableRow>
          ) : (
            filteredTasks.map((task, index) => (
              <motion.tr
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <TableCell className="font-medium">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(task.status)}>
                    {getStatusLabel(task.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {getPriorityLabel(task.priority)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={task.user.avatar || "/placeholder.svg"} alt={task.user.name} />
                      <AvatarFallback>{task.user.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(task.dueDate)}</TableCell>
                <TableCell>
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
                      <DropdownMenuItem>Changer le statut</DropdownMenuItem>
                      <DropdownMenuItem>Réassigner</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
