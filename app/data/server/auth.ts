import { getCookie } from "@/lib/utils"
import type { Session } from "../types"
import getEnv from "@/lib/env"
import ky from "ky"

export async function getSession(request: Request): Promise<Session | null> {
  try {
    const cookie = request.headers.get("Cookie")
    console.log(cookie)

    if (!cookie) {
      return null
    }

    const token = getCookie("kioga_token", cookie)
    if (!token) {
      return null
    }

    const session = await ky<Session>(
      getEnv().BACKEND_URL + "/api/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).json()

    return session
  } catch (error) {
    return null
  }
}
