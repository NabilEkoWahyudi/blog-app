"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const initialState = {
  errors: {},
  values: {},
  success: false,
}

export default function NewBlogPage() {
  const [state, formAction, pending] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully! 🎉", "success")
      router.push("/blogs")
    }
  }, [state.success, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Blog</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-gray-400 text-xs">(min. 5 chars)</span>
            </label>
            <input
              id="blog-title"
              type="text"
              name="title"
              required
              defaultValue={state.values?.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Blog post title"
            />
            {state.errors?.title && (
              <p className="text-red-600 text-xs mt-1">{state.errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author <span className="text-gray-400 text-xs">(min. 5 chars)</span>
            </label>
            <input
              id="blog-author"
              type="text"
              name="author"
              required
              defaultValue={state.values?.author}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Author name"
            />
            {state.errors?.author && (
              <p className="text-red-600 text-xs mt-1">{state.errors.author}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL <span className="text-gray-400 text-xs">(min. 5 chars)</span>
            </label>
            <input
              id="blog-url"
              type="text"
              name="url"
              required
              defaultValue={state.values?.url}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://example.com/blog-post"
            />
            {state.errors?.url && (
              <p className="text-red-600 text-xs mt-1">{state.errors.url}</p>
            )}
          </div>

          {state.errors?.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {state.errors.general}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {pending ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  )
}
