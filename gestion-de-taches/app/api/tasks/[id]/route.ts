import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Simulating a database with in-memory storage
const tasks: any[] = []

// JWT secret key (would be in environment variables in a real app)
const JWT_SECRET = "your-secret-key"

// Middleware to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.split(" ")[1]
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string }
  } catch (error) {
    return null
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  // Verify token
  const decoded = verifyToken(request)
  if (!decoded) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
  }

  try {
    const taskId = params.id
    const updates = await request.json()

    // Find task index
    const taskIndex = tasks.findIndex((task) => task.id === taskId && task.userId === decoded.id)

    if (taskIndex === -1) {
      return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 })
    }

    // Update task
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
    }

    tasks[taskIndex] = updatedTask

    return NextResponse.json(updatedTask, { status: 200 })
  } catch (error) {
    console.error("Task update error:", error)
    return NextResponse.json({ message: "Erreur lors de la mise à jour de la tâche" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Verify token
  const decoded = verifyToken(request)
  if (!decoded) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
  }

  try {
    const taskId = params.id

    // Find task index
    const taskIndex = tasks.findIndex((task) => task.id === taskId && task.userId === decoded.id)

    if (taskIndex === -1) {
      return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 })
    }

    // Delete task
    const deletedTask = tasks[taskIndex]
    tasks.splice(taskIndex, 1)

    return NextResponse.json(deletedTask, { status: 200 })
  } catch (error) {
    console.error("Task deletion error:", error)
    return NextResponse.json({ message: "Erreur lors de la suppression de la tâche" }, { status: 500 })
  }
}
