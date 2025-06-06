import dynamic from 'next/dynamic'

const AuthPageContent = dynamic(() => import('@/components/AuthPageContent').then(mod => mod.AuthPageContent), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function AuthPage() {
  return <AuthPageContent />
}