import type { Product } from "@/data/types"
import { api } from "@/lib/ky"
import { useQuery } from "@tanstack/react-query"

export default function useGetBestSellingProductsWeekly() {
  return useQuery({
    queryKey: ["products", "top-bestseller-weekly"],
    queryFn: async () => api<Product[]>("products/top-weekly").json()
  })
}
