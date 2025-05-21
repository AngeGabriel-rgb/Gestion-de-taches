"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface User {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  status: "active" | "inactive" | "pending";
  joinedAt: string;
}

interface RecentUsersProps {
  users?: User[];
  onViewProfile?: (user: User) => void;
  onEditUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
}

const statusConfig = {
  active: {
    className: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    label: "Actif"
  },
  inactive: {
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
    label: "Inactif"
  },
  pending: {
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    label: "En attente"
  }
} as const;

export function RecentUsers({ 
  users = [], 
  onViewProfile, 
  onEditUser, 
  onDeleteUser 
}: RecentUsersProps) {
  const defaultUsers: User[] = [
    {
      id: 0,
      name: "Aucun utilisateur récent",
      email: "",
      initials: "NA",
      status: "inactive",
      joinedAt: ""
    }
  ];

  const displayedUsers = users.length > 0 ? users : defaultUsers;

  return (
    <div className="space-y-4">
      {displayedUsers.map((user, index) => (
        <motion.div
          key={user.id}
          className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="flex-shrink-0">
              <AvatarImage src={user.avatar} alt={`Avatar de ${user.name}`} />
              <AvatarFallback>
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {user.email || "Aucun email fourni"}
              </p>
              {user.joinedAt && (
                <p className="text-xs text-muted-foreground">
                  {user.joinedAt}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={statusConfig[user.status].className}
            >
              {statusConfig[user.status].label}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menu des actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onViewProfile?.(user)}>
                  Voir le profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEditUser?.(user)}>
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDeleteUser?.(user)}
                >
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