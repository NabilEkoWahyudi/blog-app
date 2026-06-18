import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "../services/session"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { generateToken } from "../actions/me"
import { markAsRead } from "../actions/blogs"

export const dynamic = "force-dynamic"


export const metadata = {
  title: "My Page - BlogApp",
}

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  // Get reading list with blog info
  const userReadingList = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: {
      blog: true,
    },
  })

  const unread = userReadingList.filter((item) => !item.read)
  const read = userReadingList.filter((item) => item.read)

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Profile Section */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">👤 My Profile</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Name</p>
            <p className="text-gray-800 font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Username</p>
            <p className="text-gray-800 font-medium">{user.username}</p>
          </div>
        </div>
      </section>

      {/* API Token Section - Exercise 18 */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔑 API Token</h2>
        {user.token ? (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-400 mb-1">Your token</p>
            <code className="text-sm text-gray-700 break-all">{user.token}</code>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mb-4">No token generated yet.</p>
        )}
        <form action={generateToken}>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            {user.token ? "🔄 Regenerate token" : "✨ Generate token"}
          </button>
        </form>
      </section>

      {/* Reading List - Exercise 20 & 21 */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📚 Reading List</h2>

        {/* Unread Section */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
              {unread.length} unread
            </span>
          </h3>
          {unread.length === 0 ? (
            <p className="text-gray-400 text-sm">No unread blogs. Great job! 🎉</p>
          ) : (
            <ul className="space-y-2">
              {unread.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between bg-amber-50 rounded-lg px-4 py-3"
                >
                  <div>
                    <a
                      href={item.blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 font-medium hover:underline"
                    >
                      {item.blog.title}
                    </a>
                    <p className="text-xs text-gray-500">{item.blog.author}</p>
                  </div>
                  <form action={markAsRead.bind(null, item.id)}>
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1 rounded-full transition-colors cursor-pointer"
                    >
                      ✓ Mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Read Section */}
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
              {read.length} read
            </span>
          </h3>
          {read.length === 0 ? (
            <p className="text-gray-400 text-sm">Nothing read yet.</p>
          ) : (
            <ul className="space-y-2">
              {read.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-50 rounded-lg px-4 py-3 opacity-75"
                >
                  <a
                    href={item.blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 font-medium hover:underline line-through"
                  >
                    {item.blog.title}
                  </a>
                  <p className="text-xs text-gray-400">{item.blog.author}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
