import type { Session } from "@/data/types"
import { api } from "@/lib/ky"
import { useQuery } from "@tanstack/react-query"
import type { HTTPError } from "ky"

type useAuthReturn =
  | {
      session: Session | null | undefined
      isLoading: false
    }
  | {
      session: null | undefined
      isLoading: true
    }

export default function useAuth(): useAuthReturn {
  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        return await api<Session>("auth").json()
      } catch (error) {
        const err = error as HTTPError
        console.log(await err.response.text())

        if (err.response?.status === 401) return null

        throw error
      }
    }
  })

  return { session: data, isLoading } as useAuthReturn
}
