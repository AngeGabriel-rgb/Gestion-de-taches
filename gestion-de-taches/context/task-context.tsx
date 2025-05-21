"use client"

import type React from "react"
import type { Task } from "@/types/task"
import { createContext, useContext, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

type TaskContextType = {
  tasks: Task[]
  isLoading: boolean
  fetchTasks: () => Promise<void>
  createTask: (task: Omit<Task, "id" | "createdAt">) => Promise<void>
  updateTask: (id: string, task: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleRequest = async (
    url: string,
    method: string,
    body?: any,
    isJson = true
  ) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Non authentifié")

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    }

    if (isJson) {
      headers["Content-Type"] = "application/json"
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `Échec de la requête (${response.status})`
      )
    }

    return response
  }

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await handleRequest("/api/tasks", "GET")
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Erreur lors du chargement des tâches:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createTask = async (task: Omit<Task, "id" | "createdAt">) => {
    try {
      const response = await handleRequest("/api/tasks", "POST", task)
      const newTask = await response.json()
      setTasks((prev) => [...prev, newTask])
      toast({
        title: "Tâche créée",
        description: "Votre tâche a été créée avec succès",
      })
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
      throw error
    }
  }

  const updateTask = async (id: string, taskUpdate: Partial<Task>) => {
    try {
      const response = await handleRequest(
        `/api/tasks/${id}`,
        "PATCH",
        taskUpdate
      )
      const updatedTask = await response.json()
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      )
      toast({
        title: "Tâche mise à jour",
        description: "Votre tâche a été mise à jour avec succès",
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await handleRequest(`/api/tasks/${id}`, "DELETE")
      setTasks((prev) => prev.filter((task) => task.id !== id))
      toast({
        title: "Tâche supprimée",
        description: "Votre tâche a été supprimée avec succès",
      })
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      })
      throw error
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}