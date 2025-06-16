export type Product = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  discount: number
  image: string
  stock: number
  category_id: number
  subcategory_id: number
  brand_id: number
  category: Category
  brand: Brand
  subcategory: Subcategory
}

export type Category = {
  id: number
  name: string
  slug: string
  image: string
}

export type Subcategory = {
  id: number
  name: string
  slug: string
}

export type Brand = {
  id: number
  name: string
  slug: string
  image: string
}

export type CursorPagination<T> = {
  items: T[]
  nextCursor?: number | null
}

// Nexted Object
type Primitive = string | number | boolean
type NestedArray = Primitive[] | NestedObject[]

type NestedObject = {
  [key: string]: Primitive | NestedArray | NestedObject
}

export type Session = {
  id: number
  name: string
  email: string
  isEmailVerified: boolean
}

export type MercadoPagoPreference = {
  initPoint: string
}

export enum OrderStatus {
  PENDING = "Pending", // Creado
  WAITING = "Waiting", // En espera para ser recogido
  SENT = "Sent", // Enviado al cliente
  DELIVERED = "Delivered", // Entregado al cliente
  CANCELLED = "Cancelled" // Pedido cancelado por el cliente
}

type Order = {
  id: number
  code: string
  name: string
  amount: number
  status: OrderStatus
  notes: string | null
} & (
  | {
      shippingAmount: 0
      isDelivery: false
    }
  | {
      shippingAmount: number
      isDelivery: true
    }
)

type OrderProduct = {
  orderId: number
  productId: number
  quantity: number
  unitAmount: number
}

type Address = {
  id: number
  userId: number
  firstName: string
  lastName: string
  dni: string
  phone: string
  department: string
  province: string
  district: string
  streetAddress: string
  zipCode: string
  reference: string
}

type TimeStamps = {
  createdAt: string
  updatedAt: string
}

export type OrderResponse = Order & {
  orderProducts: (OrderProduct & { product: Product })[]
  address: Address
} & TimeStamps

export const OrderStatusVariants = {
  [OrderStatus.PENDING]: "pending",
  [OrderStatus.WAITING]: "info",
  [OrderStatus.SENT]: "default",
  [OrderStatus.DELIVERED]: "success",
  [OrderStatus.CANCELLED]: "destructive"
} as const

export const OrderStatusDataBar = {
  [OrderStatus.PENDING]: [{ value: 1 }, { value: 9 }],
  [OrderStatus.WAITING]: [{ value: 8 }, { value: 2 }],
  [OrderStatus.SENT]: [{ value: 5 }, { value: 5 }],
  [OrderStatus.DELIVERED]: [{ value: 10 }, { value: 0 }],
  [OrderStatus.CANCELLED]: [{ value: 10 }, { value: 0 }]
} as const

export const OrderStatusFillColor = {
  [OrderStatus.PENDING]: "fill-gray-500",
  [OrderStatus.WAITING]: "fill-blue-500",
  [OrderStatus.SENT]: "fill-primary",
  [OrderStatus.DELIVERED]: "fill-green-500",
  [OrderStatus.CANCELLED]: "fill-destructive"
} as const

export const OrderStatusStrokeColor = {
  [OrderStatus.PENDING]: "stroke-gray-500",
  [OrderStatus.WAITING]: "stroke-blue-500",
  [OrderStatus.SENT]: "stroke-primary",
  [OrderStatus.DELIVERED]: "stroke-green-500",
  [OrderStatus.CANCELLED]: "stroke-destructive"
} as const

export const OrderStatusTextColor = {
  [OrderStatus.PENDING]: "text-gray-500",
  [OrderStatus.WAITING]: "text-blue-500",
  [OrderStatus.SENT]: "text-primary",
  [OrderStatus.DELIVERED]: "text-green-500",
  [OrderStatus.CANCELLED]: "text-destructive"
} as const

export const OrderTraductorStatus = {
  [OrderStatus.PENDING]: "Pendiente",
  [OrderStatus.WAITING]: "En espera",
  [OrderStatus.SENT]: "Enviado",
  [OrderStatus.DELIVERED]: "Entregado",
  [OrderStatus.CANCELLED]: "Cancelado"
}
