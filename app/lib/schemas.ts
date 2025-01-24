import { z } from "zod"

export const loginUserSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z.string().min(1, "La contraseña es obligatoria")
})

export type loginUserSchemaType = z.infer<typeof loginUserSchema>

export const registerUserSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio").max(255),
    email: z
      .string()
      .min(1, "El email es obligatorio")
      .email("El email no es válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    password_confirmation: z.string()
  })
  .refine(
    ({ password_confirmation, password }) => password === password_confirmation,
    {
      message: "Las contraseñas deben ser iguales",
      path: ["password_confirmation"]
    }
  )

export type registerUserSchemaType = z.infer<typeof registerUserSchema>

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "El email es obligatorio")
      .email("El email no es válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    password_confirmation: z.string()
  })
  .refine(
    ({ password_confirmation, password }) => password === password_confirmation,
    {
      message: "Las contraseñas deben ser iguales",
      path: ["password_confirmation"]
    }
  )

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

export const userProfileSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio").max(255),
    password: z
      .string()
      .transform(password => (password ? password : undefined)),
    password_confirmation: z
      .string()
      .transform(password => (password ? password : undefined))
  })
  .refine(
    ({ password }) => {
      if (password && password.length < 8) return false

      return true
    },
    {
      message: "La contraseña debe tener al menos 8 caracteres",
      path: ["password"]
    }
  )
  .refine(
    ({ password_confirmation, password }) => password === password_confirmation,
    {
      message: "Las contraseñas deben ser iguales",
      path: ["password_confirmation"]
    }
  )

export type userProfileSchemaType = z.infer<typeof userProfileSchema>

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const checkoutSchema = z
  .object({
    is_delivery: z.boolean(),
    address_id: z.number().optional(),
    address: z
      .object({
        first_name: z.string().min(1, "El nombre es obligatorio").max(255),
        last_name: z.string().min(1, "El apeliido es obligatorio").max(255),
        dni: z
          .string()
          .min(1, "El dni es obligatorio")
          .regex(/^\d+$/, "El dni está compuesto de dígitos")
          .length(8, "El dni debe tener 8 caracteres"),
        phone: z
          .string()
          .min(1, "El teléfono es obligatorio")
          .regex(phoneRegex, "El teléfono no es válido"),
        department: z.string().max(255).optional(),
        province: z.string().max(255).optional(),
        district: z.string().max(255).optional(),
        street_address: z.string().max(255).optional(),
        zip_code: z
          .string()
          .max(10, "El código postal tiene 10 caracteres como máximo")
          .optional()
          .refine(value => value === "" || /^\d+$/.test(value!), {
            message: "El código postal está compuesto de dígitos"
          }),
        reference: z.string().max(255).optional()
      })
      .optional(),
    notes: z.string().max(255).optional()
  })
  .superRefine(({ is_delivery, address }, ctx) => {
    if (is_delivery) {
      if (!address?.department)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address.department"],
          message: "El departamento es obligatorio"
        })

      if (!address?.district)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address.district"],
          message: "El distrito es obligatorio"
        })

      if (!address?.province)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address.province"],
          message: "La provincia es obligatoria"
        })

      if (!address?.street_address)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address.street_address"],
          message: "La dirección es obligatoria"
        })
    }
  })

export type checkoutSchemaType = z.infer<typeof checkoutSchema>
