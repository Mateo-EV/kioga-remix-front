import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormController } from "@/components/ui/form"
import { useForm } from "@/hooks/use-form"
import { api } from "@/lib/ky"
import {
  loginUserSchema,
  registerUserSchema,
  type loginUserSchemaType,
  type registerUserSchemaType
} from "@/lib/schemas"
import type { HTTPError } from "ky"
import { useTransition } from "react"
import { useNavigate } from "react-router"

type CredentialsFormProps = {
  isLoginPage?: boolean
}

function CredentialsForm({ isLoginPage = false }: CredentialsFormProps) {
  const form = useForm<loginUserSchemaType | registerUserSchemaType>({
    schema: isLoginPage ? loginUserSchema : registerUserSchema,
    defaultValues: {
      email: "",
      password: "",
      name: "",
      password_confirmation: ""
    }
  })
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const onSubmit = async (
    values: loginUserSchemaType | registerUserSchemaType
  ) => {
    try {
      if (isLoginPage) {
        await api
          .post<{ message: string }>("auth/login", {
            json: values
          })
          .json()

        startTransition(() => {
          navigate("/")
        })
      } else {
        await api.post("auth/register", {
          json: {
            name: "name" in values ? values.name : "",
            email: values.email,
            password: values.password
          }
        })
        startTransition(() => {
          navigate("/verificar-email")
        })
      }
    } catch (error) {
      const err = error as HTTPError

      const errorData = await err.response.json()

      const errorMessage = (errorData as { message?: string })?.message

      if (errorMessage === "Este email ya está en uso") {
        form.setError("email", {
          type: "validate",
          message: "Este email ya está en uso"
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {!isLoginPage && (
          <FormController control={form.control} name="name" label="Name" />
        )}
        <FormController
          control={form.control}
          name="email"
          label="Email"
          inputProps={{ type: "email" }}
        />

        <FormController
          control={form.control}
          name="password"
          label="Contraseña"
          inputProps={{
            type: "password"
          }}
        />

        {!isLoginPage && (
          <FormController
            control={form.control}
            name="password_confirmation"
            label="Confirmar Contraseña"
            inputProps={{
              type: "password"
            }}
          />
        )}

        {/* <Link
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "h-auto justify-end p-0"
          )}
          to="/forgot-password"
          viewTransition
        >
          ¿Olvidaste tu contraseña?
        </Link> */}
        <ButtonWithLoading
          isLoading={form.formState.isSubmitting || isPending}
          type="submit"
        >
          {isLoginPage ? "Iniciar Sesión" : "Registrarse"}
        </ButtonWithLoading>
      </form>
    </Form>
  )
}

export default CredentialsForm
