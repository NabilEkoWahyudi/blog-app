import { db } from "@/db"

export const dynamic = "force-dynamic"


export const metadata = {
  title: "Users - BlogApp",
}

export default async function UsersPage() {
  const users = await db.query.users.findMany()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-400">No users registered yet.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3"
            >
              <div className="bg-indigo-100 text-indigo-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-400">@{user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
