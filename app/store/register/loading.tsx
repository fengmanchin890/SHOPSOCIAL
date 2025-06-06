export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>

        <div className="w-full">
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
          
          <div className="border rounded-lg p-6 space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}