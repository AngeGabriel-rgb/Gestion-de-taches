import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  userId: string
  createdAt: string
}

const tasks: Task[] = []
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("Authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.split(" ")[1]
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string }
  } catch (error) {
    console.error("JWT verification error:", error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const userTasks = tasks.filter((task) => task.userId === decoded.id)
    return NextResponse.json(userTasks, { status: 200 })
  } catch (error) {
    console.error("GET tasks error:", error)
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const taskData = await request.json()

    if (!taskData?.title || !taskData?.description) {
      return NextResponse.json(
        { message: "Titre et description requis" },
        { status: 400 }
      )
    }

    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed || false,
      userId: decoded.id,
      createdAt: new Date().toISOString(),
    }

    tasks.push(newTask)
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error("POST task error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la création de la tâche" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id, ...updateData } = await request.json()
    const taskIndex = tasks.findIndex(
      (task) => task.id === id && task.userId === decoded.id
    )

    if (taskIndex === -1) {
      return NextResponse.json(
        { message: "Tâche non trouvée" },
        { status: 404 }
      )
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateData,
    }

    return NextResponse.json(tasks[taskIndex], { status: 200 })
  } catch (error) {
    console.error("PATCH task error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json(
        { message: "Non autorisé" },
        { status: 401 }
      )
    }

    const { id } = await request.json()
    const taskIndex = tasks.findIndex(
      (task) => task.id === id && task.userId === decoded.id
    )

    if (taskIndex === -1) {
      return NextResponse.json(
        { message: "Tâche non trouvée" },
        { status: 404 }
      )
    }

    tasks.splice(taskIndex, 1)
    return NextResponse.json(
      { message: "Tâche supprimée" },
      { status: 200 }
    )
  } catch (error) {
    console.error("DELETE task error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la suppression" },
      { status: 500 }
    )
  }
}