import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  })
}

export const getUserByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
  })
}
