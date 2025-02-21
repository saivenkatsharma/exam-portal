import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export default async function DashboardPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId) {
    redirect('/login')
  }

  // Redirect based on role
  if (decoded.role === 'TEACHER') {
    redirect('/dashboard/teacher')
  } else if (decoded.role === 'STUDENT') {
    redirect('/dashboard/student')
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    })

    if (!user) {
      console.log('User not found, redirecting to login')
      redirect('/login')
    }

    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
            <p className="text-gray-600 mt-2">You are logged in as: {user.role}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Available Exams</h2>
              <p className="text-gray-600">No exams available at the moment.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity.</p>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Dashboard error:', error)
    redirect('/login')
  }
} 