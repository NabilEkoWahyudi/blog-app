"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center gap-4 shadow-lg">
      <div className="flex items-center gap-1">
        <span className="text-indigo-400 font-bold text-lg">📝</span>
        <NavLink href="/">
          <span className="font-bold text-white">BlogApp</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-4 ml-2">
        <NavLink href="/blogs">blogs</NavLink>
        <NavLink href="/users">users</NavLink>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <NavLink href="/blogs/new">+ new blog</NavLink>
            <NavLink href="/me">my page</NavLink>
            <em className="text-indigo-300 text-sm">{session.user?.name}</em>
            <button
              onClick={() => signOut()}
              className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded text-sm transition-colors cursor-pointer"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
