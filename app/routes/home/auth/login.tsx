import AuthPage from "@/components/home/auth/auth-page"
import { MetaGenerator } from "@/lib/metadata"
import { useAuth } from "@/providers/auth-provider"

export const meta = () => MetaGenerator({ title: "Login" })

export default function LoginPage() {
  const session = useAuth()

  if (session) {
    return null
  }

  return <AuthPage isLoginPage />
}
