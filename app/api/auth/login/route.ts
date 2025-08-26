import { NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("[v0] Login attempt for email:", email)
    console.log("[v0] Password length:", password?.length)
    console.log("[v0] Request body keys:", Object.keys(body))

    // Validate input
    if (!email || !password) {
      console.log("[v0] Missing email or password")
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Attempt authentication
    console.log("[v0] Calling authenticateUser with:", { email, passwordProvided: !!password })
    const user = await authenticateUser(email, password)
    console.log("[v0] Authentication result:", user ? "SUCCESS" : "FAILED")

    if (!user) {
      console.log("[v0] Authentication failed for email:", email)
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Log successful login (excluding sensitive data)
    console.log("[v0] Successful login for user:", user.id, "role:", user.role)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
  }
}
