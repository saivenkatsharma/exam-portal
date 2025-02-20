import Link from "next/link"
import LoginForm from "@/app/components/auth/LoginForm" // assuming you have this component

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto">
        <LoginForm />
        <p className="text-center mt-4 text-gray-600">
          New student?{" "}
          <Link 
            href="/register" 
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
} 