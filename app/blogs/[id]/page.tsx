import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogById } from "../../services/blogs"
import { auth } from "@/auth"
import { getCurrentUser } from "../../services/session"
import AddToReadingListButton from "./AddToReadingListButton"

export const dynamic = "force-dynamic"


interface BlogPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  return {
    title: blog ? `${blog.title} - BlogApp` : "Blog not found",
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const session = await auth()
  const currentUser = session ? await getCurrentUser() : null
  const isOwner = currentUser?.id === blog.userId

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        href="/blogs"
        className="text-indigo-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Back to blogs
      </Link>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-1">
          Author: <span className="font-medium text-gray-700">{blog.author}</span>
        </p>
        {blog.user && (
          <p className="text-gray-400 text-sm mb-4">
            Posted by {blog.user.name}
          </p>
        )}

        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-4"
        >
          🔗 Visit blog
        </a>

        <p className="text-gray-500 text-sm">
          ❤️ {blog.likes} likes
        </p>

        {session && !isOwner && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <AddToReadingListButton blogId={blog.id} />
          </div>
        )}
      </article>
    </div>
  )
}
