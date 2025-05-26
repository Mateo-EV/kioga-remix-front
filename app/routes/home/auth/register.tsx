import AuthPage from "@/components/home/auth/auth-page"
import { MetaGenerator } from "@/lib/metadata"
import { useAuth } from "@/providers/auth-provider"

export const meta = () => MetaGenerator({ title: "Register" })

export default function RegisterPage() {
  const session = useAuth()

  if (session) {
    return null
  }

  return <AuthPage />
}
