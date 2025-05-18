import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ButtonWithLoading } from "@/components/ui/button"
import { api } from "@/lib/ky"
import { MetaGenerator } from "@/lib/metadata"
import { MailCheckIcon } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"

export const meta = () => MetaGenerator({ title: "Verificar Email" })

export default function VerifyEmailPage() {
  const [isLogginOut, startLogginOut] = useTransition()
  const [isResendingEmailVerification, startSendingEmail] = useTransition()

  const handleLogOut = () => {
    startLogginOut(async () => {
      await api.post("auth/logout")
    })
  }

  const [status, setStatus] = useState<string | null>(null)

  const resendEmailVerification = () => {
    startSendingEmail(async () => {
      try {
        const status = await api
          .post<{ status: string }>("auth/resend-verification")
          .text()

        setStatus(status)
      } catch (error) {
        toast.error("No se pudo reenviar el correo de verificación.")
      }
    })
  }

  return (
    <div className="space-y-4">
      <p>
        ¡Gracias por registrarte! Antes de comenzar, ¿podrías verificar tu
        dirección de correo electrónico haciendo clic en el enlace que te
        acabamos de enviar? Si no recibiste el correo electrónico, con gusto te
        enviaremos otro.
      </p>

      <div className="flex items-center justify-between">
        <ButtonWithLoading
          isLoading={isResendingEmailVerification}
          onClick={resendEmailVerification}
        >
          Reenviar Correo de Verificación
        </ButtonWithLoading>

        <ButtonWithLoading
          isLoading={isLogginOut}
          variant="secondary"
          onClick={handleLogOut}
        >
          Cerrar sesión
        </ButtonWithLoading>
      </div>

      {status === "verification-link-sent" && (
        <Alert>
          <MailCheckIcon className="size-4" />
          <AlertTitle>Reenviado</AlertTitle>
          <AlertDescription>
            Se ha enviado un nuevo enlace de verificación a la dirección de
            correo electrónico que proporcionaste durante el registro.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
