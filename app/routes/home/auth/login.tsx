import AuthPage from "@/components/home/auth/auth-page"
import { MetaGenerator } from "@/lib/metadata"

export const meta = () => MetaGenerator({ title: "Login" })

export default function LoginPage() {
  return <AuthPage isLoginPage />
}
