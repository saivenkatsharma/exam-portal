"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardNav() {
  const router = useRouter()

  const handleLogout = () => {
    // Clear the cookie by making a request to logout API
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    }).finally(() => {
      router.push('/login')
    })
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-gray-800">
              Exam Portal
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/profile" 
              className="text-gray-600 hover:text-gray-800"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 