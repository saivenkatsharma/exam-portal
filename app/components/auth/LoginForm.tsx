"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/Button"
import AuthLayout from "./AuthLayout"

interface LoginFormProps {
  role: 'STUDENT' | 'INVIGILATOR'
}

export default function LoginForm({ role }: LoginFormProps) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  // Format the title properly with null check
  const getFormattedTitle = (roleStr: string) => {
    if (!roleStr) return 'Login'
    return `${roleStr.charAt(0)}${roleStr.toLowerCase().slice(1)} Login`
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return

    setError("")
    setStatus("")
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        username: formData.get("username")?.toString() || "",
        password: formData.get("password")?.toString() || "",
        role: role
      }

      setStatus("Logging in...")

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || "Login failed")
      }

      if (json.success) {
        setStatus("Success! Redirecting...")
        const dashboardPath = role === 'STUDENT' ? '/dashboard/student' : '/dashboard/invigilator'
        router.push(dashboardPath)
      } else {
        throw new Error("Login failed")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title={getFormattedTitle(role)}>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {status && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {status}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            disabled={loading}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            disabled={loading}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Enter your password"
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          variant="primary"
          className="w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  )
} 