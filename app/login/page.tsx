import LoginForm from "@/app/components/auth/LoginForm"

export default function LoginPage({
  searchParams
}: {
  searchParams: { role?: string }
}) {
  // Default to STUDENT if no role specified
  const role = (searchParams.role?.toUpperCase() === 'INVIGILATOR') ? 'INVIGILATOR' : 'STUDENT'
  
  return <LoginForm role={role} />
} 