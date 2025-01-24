import type { CursorPagination, Product } from "@/data/types"
import { api } from "@/lib/ky"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router"

export default function useGetInfiniteFilteredProducts() {
  const [searchParams] = useSearchParams()
  const [limitterRequests, setLimitterRequests] = useState(0)

  const query = useInfiniteQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams(searchParams)

      if (params.has("categoria")) {
        params
          .getAll("categoria")
          .forEach(value => params.append("categories", value))
        params.delete("categoria")
      }

      if (params.get("disponibilidad")) {
        params
          .getAll("disponibilidad")
          .forEach(value => params.append("availability", value))
        params.delete("disponibilidad")
      }

      if (params.get("ordenarPor")) {
        params.set("orderBy", params.get("ordenarPor")!)
        params.delete("ordenarPor")
      }

      if (params.has("marca")) {
        params.getAll("marca").forEach(value => params.append("brands", value))
        params.delete("marca")
      }

      if (params.get("tipo")) {
        params
          .getAll("tipo")
          .forEach(value => params.append("subcategories", value))
        params.delete("tipo")
      }

      if (pageParam) {
        params.set("cursor", pageParam as string)
      }

      const response = await api<CursorPagination<Product>>("products", {
        searchParams: params
      })

      setLimitterRequests(prev => prev + 1)

      return response.json()
    },
    getNextPageParam: lastPage => lastPage.nextCursor?.toString(),
    initialPageParam: ""
  })

  return { query, limitterRequests, setLimitterRequests }
}
