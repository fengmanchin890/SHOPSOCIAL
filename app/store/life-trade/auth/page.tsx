import dynamic from 'next/dynamic'

const AuthPageContent = dynamic(() => import('@/components/AuthPageContent').then(mod => ({ default: mod.AuthPageContent })), {
  ssr: false,
  loading: () => <div className="container mx-auto px-4 py-16 flex flex-col items-center">
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="bg-white rounded-lg border p-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
})

export default function AuthPage() {
  return <AuthPageContent />
}