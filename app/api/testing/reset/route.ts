import { NextResponse } from "next/server"
import { db } from "@/db"

export const dynamic = "force-dynamic"
import { users, blogs, readingList } from "@/db/schema"

// Exercise 23: DELETE /api/testing/reset - delete all data
export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  await db.delete(readingList)
  await db.delete(blogs)
  await db.delete(users)

  return NextResponse.json({ message: "All data deleted" })
}
