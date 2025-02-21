import { notFound } from 'next/navigation'
import LoginForm from "@/app/components/auth/LoginForm"

export default function RoleLoginPage({
  params
}: {
  params: { role: string }
}) {
  const role = params.role.toUpperCase()
  
  // Only allow STUDENT or INVIGILATOR roles
  if (role !== 'STUDENT' && role !== 'INVIGILATOR') {
    return notFound()
  }
  
  return <LoginForm role={role as 'STUDENT' | 'INVIGILATOR'} />
} 