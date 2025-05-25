import type { Product } from "@/data/types"
import { api } from "@/lib/ky"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function useGetSimilarProductsBySlug(slug: string) {
  return useSuspenseQuery({
    queryKey: ["products", "slug", slug, "similar"],
    queryFn: async () => api<Product[]>(`products/${slug}/similar`).json()
  })
}
