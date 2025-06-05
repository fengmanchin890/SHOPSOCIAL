export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-32 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="h-10 w-full bg-gray-200 rounded animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-6">
          <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}