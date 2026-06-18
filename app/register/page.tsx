"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"
import Link from "next/link"

const initialState = {
  errors: {},
  values: {},
}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUser, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">✨</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Create account</h1>
          <p className="text-gray-500 text-sm mt-1">Join BlogApp today</p>
        </div>

        {state.errors?.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {state.errors.general}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="reg-username"
              type="text"
              name="username"
              required
              defaultValue={state.values?.username}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="min. 4 characters"
            />
            {state.errors?.username && (
              <p className="text-red-600 text-xs mt-1">{state.errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              id="reg-name"
              type="text"
              name="name"
              defaultValue={state.values?.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your display name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="min. 4 characters"
            />
            {state.errors?.password && (
              <p className="text-red-600 text-xs mt-1">{state.errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="reg-password-confirm"
              type="password"
              name="passwordConfirm"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="repeat your password"
            />
            {state.errors?.passwordConfirm && (
              <p className="text-red-600 text-xs mt-1">{state.errors.passwordConfirm}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {pending ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
