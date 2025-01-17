import type { Category } from "@/data/types"
import { api } from "@/lib/ky"
import { useQuery } from "@tanstack/react-query"

export default function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => api<Category[]>("categories").json()
  })
}
