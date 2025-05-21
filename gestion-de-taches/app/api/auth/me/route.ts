import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Simulating a database with in-memory storage
// This would be imported from a shared location in a real app
const users: any[] = []

// JWT secret key (would be in environment variables in a real app)
const JWT_SECRET = "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }

    // Find user
    const user = users.find((user) => user.id === decoded.id)
    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Return user data (without password)
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword, { status: 200 })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
  }
}
