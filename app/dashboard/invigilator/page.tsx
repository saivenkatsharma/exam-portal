import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import Link from 'next/link'

export default async function InvigilatorDashboard() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login/invigilator')
  }

  const decoded = await verifyAuth(token.value)
  if (!decoded?.userId || decoded.role !== 'INVIGILATOR') {
    redirect('/login/invigilator')
  }

  // Get active exams and student attempts
  const activeExams = await prisma.exam.findMany({
    where: {
      endTime: {
        gte: new Date()
      }
    },
    include: {
      _count: {
        select: { attempts: true }
      }
    }
  })

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Invigilator Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Active Exams */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Active Exams</h2>
          <div className="space-y-4">
            {activeExams.map(exam => (
              <div key={exam.id} className="border-b pb-4">
                <h3 className="font-medium">{exam.title}</h3>
                <p className="text-sm text-gray-500">
                  Active attempts: {exam._count.attempts}
                </p>
                <Link
                  href={`/dashboard/invigilator/monitor/${exam.id}`}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  Monitor Exam
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View All Students
            </button>
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Monitor Active Sessions
            </button>
            <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Generate Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 