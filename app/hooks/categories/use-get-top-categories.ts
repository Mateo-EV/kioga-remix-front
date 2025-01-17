import type { Category, Product } from "@/data/types"
import { api } from "@/lib/ky"
import { useQuery } from "@tanstack/react-query"

export default function useGetTopCategories() {
  return useQuery({
    queryKey: ["categories", "top-bestseller"],
    queryFn: async () =>
      api<
        (Category & {
          products: Product[]
        })[]
      >("categories/top-bestseller").json()
  })
}
