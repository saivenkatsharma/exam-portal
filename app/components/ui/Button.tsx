export function Button({ children, ...props }) {
  return (
    <button 
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      {...props}
    >
      {children}
    </button>
  )
} 