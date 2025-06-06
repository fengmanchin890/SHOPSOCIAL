import dynamic from 'next/dynamic'

const AuthPageContent = dynamic(() => import('@/components/AuthPageContent'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function AuthPage({ searchParams }: { searchParams: Record<string, string> }) {
  return <AuthPageContent searchParams={searchParams} />
}