"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { addBlog } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"
import { and, eq } from "drizzle-orm"

type BlogFormValues = {
  title?: string
  author?: string
  url?: string
}

type BlogState = {
  errors?: {
    title?: string
    author?: string
    url?: string
    general?: string
  }
  values?: BlogFormValues
  success?: boolean
}

// Exercise 13 & 14: createBlog with validation + retain values
export const createBlog = async (
  _prevState: BlogState,
  formData: FormData,
): Promise<BlogState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const url = (formData.get("url") as string)?.trim()

  const errors: BlogState["errors"] = {}

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }
  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }

  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blog = await addBlog(title, author, url, user.id)

  // Auto-add to creator's reading list (Exercise 20)
  await db.insert(readingList).values({
    userId: user.id,
    blogId: blog.id,
    read: false,
  })

  revalidatePath("/blogs")
  return { success: true, errors: {}, values: {} }
}

// Exercise 20: Add to reading list
export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  // Check if already in reading list
  const existing = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, user.id),
      eq(readingList.blogId, blogId),
    ),
  })

  if (!existing) {
    await db.insert(readingList).values({
      userId: user.id,
      blogId,
      read: false,
    })
  }

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

// Exercise 21: Mark as read
export const markAsRead = async (readingListId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.id, readingListId),
        eq(readingList.userId, user.id),
      ),
    )

  revalidatePath("/me")
}
