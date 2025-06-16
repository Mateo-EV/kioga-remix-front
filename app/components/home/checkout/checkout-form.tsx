import {
  Form,
  FormControl,
  FormController,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { MercadoPagoPreference } from "@/data/types"
import { useCart } from "@/hooks/use-cart"
import { useForm } from "@/hooks/use-form"
import { api } from "@/lib/ky"
import { cn } from "@/lib/utils"
import type { HTTPError } from "ky"
import { useEffect } from "react"
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const DEFAULT_ADDRESS_VALUES = {
  firstName: "",
  lastName: "",
  dni: "",
  phone: "",
  department: "",
  district: "",
  province: "",
  streetAddress: "",
  zipCode: "",
  reference: ""
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const checkoutSchema = z
  .object({
    isDelivery: z.boolean(),
    address: z
      .object({
        firstName: z.string().min(1, "El nombre es obligatorio").max(255),
        lastName: z.string().min(1, "El apeliido es obligatorio").max(255),
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
        streetAddress: z.string().max(255).optional(),
        zipCode: z
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
  .superRefine(({ isDelivery, address }, ctx) => {
    if (isDelivery) {
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

      if (!address?.streetAddress)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address.streetAddress"],
          message: "La dirección es obligatoria"
        })
    }
  })

type checkoutSchemaType = z.infer<typeof checkoutSchema>

function formatValuesToSend(values: checkoutSchemaType) {
  const data = { ...values }

  const optionalProps = [
    "department",
    "district",
    "province",
    "streetAddress",
    "zipCode",
    "reference"
  ] as const

  if (data.isDelivery) {
    optionalProps.forEach(field => {
      if (!data.address?.[field]) {
        delete data.address?.[field]
      }
    })
  } else {
    optionalProps.forEach(field => {
      delete data.address?.[field]
    })
  }

  if (!data.notes) delete data.notes

  return data as any
}

export default function CheckoutForm({
  setIsDelivery,
  setIsMakingOrder
}: {
  setIsDelivery: (v: boolean) => void
  setIsMakingOrder: (v: boolean) => void
}) {
  const form = useForm<checkoutSchemaType>({
    schema: checkoutSchema,
    defaultValues: {
      isDelivery: true,
      address: DEFAULT_ADDRESS_VALUES,
      notes: ""
    }
  })

  const isDelivery = form.watch("isDelivery")

  useEffect(() => {
    form.setValue("address", DEFAULT_ADDRESS_VALUES)
    setIsDelivery(isDelivery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelivery])

  const { products, removeAllProducts } = useCart()

  const makeOrder = form.handleSubmit(async values => {
    setIsMakingOrder(true)
    const preOrder = formatValuesToSend(values)

    preOrder.orderProducts = products.map(product => ({
      quantity: product.quantity,
      productId: product.id
    }))

    console.log(preOrder)

    try {
      const response = await api
        .post<MercadoPagoPreference>("orders/start", { json: preOrder })
        .json()
      window.location.href = response.initPoint
      removeAllProducts()
    } catch (error) {
      const err = error as HTTPError
      if (err.response?.status !== 422) {
        toast.error("Ocurrió un error")
      } else {
        toast.error(
          ((await err.response.json()) as any).message ?? "Error de validación"
        )
      }
    } finally {
      setIsMakingOrder(false)
    }
  })

  return (
    <Form {...form}>
      <form
        id="checkout-form"
        className="grid grid-cols-6 gap-4"
        onSubmit={makeOrder}
      >
        <h2 className="col-span-6 text-xl font-medium">Información de Envío</h2>
        <div className="col-span-6 space-y-2">
          <Label>¿Cómo quieres recibir tu pedido?</Label>
          <CheckoutIsDeliveryController
            control={form.control}
            name="isDelivery"
          />
        </div>

        <FormController
          control={form.control}
          name="address.firstName"
          label="Nombre"
          containerProps={{ className: "col-span-6 md:col-span-3" }}
        />

        <FormController
          control={form.control}
          name="address.lastName"
          label="Apellido"
          containerProps={{ className: "col-span-6 md:col-span-3" }}
        />

        <FormController
          control={form.control}
          name="address.dni"
          label="Documento de Identidad"
          containerProps={{ className: "col-span-6" }}
        />

        <FormController
          control={form.control}
          name="address.phone"
          label="Teléfono"
          inputProps={{ type: "tel" }}
          containerProps={{ className: "col-span-6" }}
        />

        {isDelivery && (
          <>
            <FormController
              control={form.control}
              name="address.department"
              label="Departamento"
              containerProps={{ className: "col-span-6 md:col-span-2" }}
            />

            <FormController
              control={form.control}
              name="address.district"
              label="Distrito"
              containerProps={{ className: "col-span-6 md:col-span-2" }}
            />

            <FormController
              control={form.control}
              name="address.province"
              label="Provincia"
              containerProps={{ className: "col-span-6 md:col-span-2" }}
            />

            <FormController
              control={form.control}
              name="address.streetAddress"
              label="Dirección"
              containerProps={{ className: "col-span-6 md:col-span-3" }}
            />

            <FormController
              control={form.control}
              name="address.zipCode"
              label="Código Postal"
              containerProps={{ className: "col-span-6 md:col-span-3" }}
            />

            <FormController
              control={form.control}
              name="address.reference"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Referencia</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alguna referencia que sea de utilidad para el envío"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}

        <FormController
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Nota</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Alguna información extra que desee enviarnos"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function CheckoutIsDeliveryController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name
}: Pick<ControllerProps<TFieldValues, TName>, "control" | "name">) {
  return (
    <FormController
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={v => {
                if (v === "0") {
                  field.onChange(true)
                } else {
                  field.onChange(false)
                }
              }}
              defaultValue={field.value ? "0" : "1"}
              className="flex items-center gap-4"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="0" />
                </FormControl>
                <FormLabel className="font-light">Envío a domicilio</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="1" />
                </FormControl>
                <FormLabel className="font-light">Retiro en tienda</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
