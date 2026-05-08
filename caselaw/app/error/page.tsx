export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-2">Authentication error</h1>
        <p className="text-gray-400 text-sm">Something went wrong. Please try again.</p>
        <a href="/auth/login" className="mt-6 inline-block text-yellow-400 hover:text-yellow-300 text-sm">
          ← Back to login
        </a>
      </div>
    </div>
  )
}
