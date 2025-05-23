import ky from "ky"
import getEnv from "./env"

export const api = ky.create({
  prefixUrl: getEnv().BACKEND_URL + "/api",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})
