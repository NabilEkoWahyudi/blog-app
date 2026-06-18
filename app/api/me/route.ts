import { NextRequest, NextResponse } from "next/server"
import { getUserByToken } from "@/app/services/users"

export const dynamic = "force-dynamic"

// Exercise 19: GET /api/me - returns user info based on Bearer token
export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.slice(7)
  const user = await getUserByToken(token)

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
  })
}
