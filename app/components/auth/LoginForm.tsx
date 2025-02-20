"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/Button"
import AuthLayout from "./AuthLayout"

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

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

        // First try router push
        try {
          await router.push('/dashboard')
        } catch (e) {
          // If router push fails, use window.location
          window.location.href = '/dashboard'
        }
      } else {
        throw new Error("Login failed")
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Login">
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
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  )
} 