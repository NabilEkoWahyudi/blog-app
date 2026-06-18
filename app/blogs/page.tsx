import Link from "next/link"
import { getBlogs } from "../services/blogs"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "All Blogs - BlogApp",
  description: "Browse all blog posts",
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
        <Link
          href="/blogs/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-5xl mb-3">📭</p>
          <p className="text-lg">No blogs yet. Be the first to create one!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <Link
                href={`/blogs/${blog.id}`}
                className="text-lg font-semibold text-indigo-700 hover:underline"
              >
                {blog.title}
              </Link>
              <p className="text-gray-500 text-sm mt-1">
                by <span className="font-medium">{blog.author}</span>
                {blog.user && (
                  <> &mdash; posted by {blog.user.name}</>
                )}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {blog.likes} likes
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
