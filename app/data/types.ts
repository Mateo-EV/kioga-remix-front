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
