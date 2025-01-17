import type { Brand, Category, Product } from "@/data/types"
import { api } from "@/lib/ky"
import { useQuery } from "@tanstack/react-query"

export default function useGetBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => api<Brand[]>("brands").json()
  })
}
