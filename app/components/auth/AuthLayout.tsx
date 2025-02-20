export default function AuthLayout({ children, title }) {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      {children}
    </div>
  )
} 