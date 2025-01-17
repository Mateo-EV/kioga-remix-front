import type { Product } from "@/data/types"
import { toast } from "sonner"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ProductCart = Product & {
  quantity: number
}

type useCartProps = {
  products: ProductCart[]
  addProduct: (product: ProductCart) => void
  removeProduct: (productId: number) => void
  setQuantityByProductId: (
    productId: number
  ) => (quantity: number | ((quantity: number) => number)) => void
  removeAllProducts: () => void
}

export const useCart = create<useCartProps>()(
  persist(
    set => ({
      products: [],
      addProduct: product =>
        set(({ products: prevProducts }) => {
          const exists = prevProducts.some(p => product.id === p.id)

          if (exists) {
            toast.info("Revisa tu carrito de compras")
            return {}
          } else toast.success("Producto agregado al carrito")

          return {
            products: [...prevProducts, product]
          }
        }),
      removeProduct: productId =>
        set(({ products: prevProducts }) => {
          const products = [...prevProducts]
          const indexToDelete = prevProducts.findIndex(p => p.id === productId)
          products.splice(indexToDelete, 1)
          return { products }
        }),
      setQuantityByProductId: productId => {
        return quantity => {
          if (typeof quantity === "number") {
            set(({ products: prevProducts }) => {
              const products = [...prevProducts]
              const indexToDelete = prevProducts.findIndex(
                p => p.id === productId
              )
              products[indexToDelete] = {
                ...products[indexToDelete]!,
                quantity
              }
              return { products }
            })
          } else {
            set(({ products: prevProducts }) => {
              const products = [...prevProducts]
              const indexToDelete = prevProducts.findIndex(
                p => p.id === productId
              )
              const quantity_number = quantity(
                products[indexToDelete]!.quantity
              )
              products[indexToDelete] = {
                ...products[indexToDelete]!,
                quantity: quantity_number
              }
              return { products }
            })
          }
        }
      },
      removeAllProducts: () => set({ products: [] })
    }),
    { name: "cart-data" }
  )
)
