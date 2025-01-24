import { buttonVariants } from "@/components/ui/button"
import CredentialsForm from "./credentials-form"
import { H2 } from "../typography"
import { Link } from "react-router"

type AuthPageProps = {
  isLoginPage?: boolean
}

function AuthPage({ isLoginPage = false }: AuthPageProps) {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 py-4">
      <H2 className="xs:text-center">
        {isLoginPage ? "Iniciar Sesión" : "Registrarse"}
      </H2>
      <CredentialsForm isLoginPage={isLoginPage} />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          to={isLoginPage ? "/register" : "/login"}
          className={buttonVariants({
            variant: "link",
            size: "sm",
            className: "h-auto"
          })}
          viewTransition
        >
          {isLoginPage
            ? "¿No tienes una cuenta? Regístrate"
            : "¿Ya tienes una cuenta? Inicia Sesión"}
        </Link>
      </p>
    </div>
  )
}

export default AuthPage
