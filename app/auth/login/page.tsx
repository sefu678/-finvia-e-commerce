import { LoginForm } from "@/components/auth/login-form"
import { SiteHeader } from "@/components/site-header"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </main>
    </div>
  )
}
