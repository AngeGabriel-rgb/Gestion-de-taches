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
import { UserDialog } from "@/components/admin/user-dialog"
import { motion } from "framer-motion"

type UserTableProps = {
  searchQuery: string
}

export function UserTable({ searchQuery }: UserTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [editUser, setEditUser] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const users = [
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
      status: "active",
      role: "Utilisateur",
      tasks: 12,
      joinedAt: "2023-05-15",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TD",
      status: "active",
      role: "Administrateur",
      tasks: 8,
      joinedAt: "2023-06-20",
    },
    {
      id: 3,
      name: "Camille Bernard",
      email: "camille.bernard@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "CB",
      status: "inactive",
      role: "Utilisateur",
      tasks: 5,
      joinedAt: "2023-07-10",
    },
    {
      id: 4,
      name: "Lucas Petit",
      email: "lucas.petit@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LP",
      status: "active",
      role: "Utilisateur",
      tasks: 15,
      joinedAt: "2023-04-05",
    },
    {
      id: 5,
      name: "Emma Leroy",
      email: "emma.leroy@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EL",
      status: "pending",
      role: "Utilisateur",
      tasks: 0,
      joinedAt: "2023-08-01",
    },
    {
      id: 6,
      name: "Hugo Moreau",
      email: "hugo.moreau@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "HM",
      status: "active",
      role: "Modérateur",
      tasks: 20,
      joinedAt: "2023-03-15",
    },
    {
      id: 7,
      name: "Léa Roux",
      email: "lea.roux@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LR",
      status: "active",
      role: "Utilisateur",
      tasks: 7,
      joinedAt: "2023-07-25",
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

  const sortedUsers = [...users]
    .filter((user) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "inactive":
        return "Inactif"
      case "pending":
        return "En attente"
      default:
        return status
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

  const handleEdit = (user: any) => {
    setEditUser(user)
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center gap-1">
                  Utilisateur
                  {sortColumn === "name" && (
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
                <Button variant="ghost" onClick={() => handleSort("role")} className="flex items-center gap-1">
                  Rôle
                  {sortColumn === "role" && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => handleSort("tasks")} className="flex items-center gap-1">
                  Tâches
                  {sortColumn === "tasks" && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("joinedAt")} className="flex items-center gap-1">
                  Inscrit le
                  {sortColumn === "joinedAt" && (
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
            {sortedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            ) : (
              sortedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(user.status)}>
                      {getStatusLabel(user.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">{user.tasks}</TableCell>
                  <TableCell>{formatDate(user.joinedAt)}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(user)}>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Voir les tâches</DropdownMenuItem>
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

      <UserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} user={editUser} />
    </>
  )
}
