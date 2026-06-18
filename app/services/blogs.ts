import { eq, desc } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"

export const getBlogs = async () => {
  return db.query.blogs.findMany({
    orderBy: [desc(blogs.createdAt)],
    with: {
      user: true,
    },
  })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
    with: {
      user: true,
    },
  })
}

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId: number,
) => {
  const [blog] = await db
    .insert(blogs)
    .values({ title, author, url, userId })
    .returning()
  return blog
}
