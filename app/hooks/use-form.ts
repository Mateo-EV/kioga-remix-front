import { zodResolver } from "@hookform/resolvers/zod"
import {
  useForm as useFormLib,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn
} from "react-hook-form"
import { type z } from "zod"

type useFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown
> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodType<unknown, any, unknown>
} & Omit<UseFormProps<TFieldValues, TContext>, "resolver">

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues
>({
  schema,
  ...props
}: useFormProps<TFieldValues, TContext>): UseFormReturn<
  TFieldValues,
  TContext,
  TTransformedValues
> => {
  return useFormLib<TFieldValues, TContext, TTransformedValues>({
    resolver: zodResolver(schema),
    ...props
  })
}
