"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

type RegisterState = {
  errors?: {
    username?: string
    password?: string
    passwordConfirm?: string
    general?: string
  }
  values?: {
    username?: string
    name?: string
  }
}

export const registerUser = async (
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: RegisterState["errors"] = {}

  // Validasi Exercise 15
  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  // Check if username already exists
  const existing = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (existing) {
    return {
      errors: { general: "Username already taken. Please choose another." },
      values: { username, name },
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name: name || username, passwordHash })

  redirect("/login")
}
