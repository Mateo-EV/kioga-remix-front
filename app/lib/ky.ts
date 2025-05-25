import ky from "ky"
import getEnv from "./env"
import { getCookie } from "./utils"

export const api = ky.create({
  prefixUrl: getEnv().BACKEND_URL + "/api",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})
// .extend({
//   hooks: {
//     beforeRequest: [
//       async request => {
//         if (request.method !== "GET") {
//           await ky.get(getEnv().BACKEND_URL + "/api/csrf-token").json()

//           const token = getCookie("XSRF-TOKEN")

//           if (token) {
//             request.headers.set("X-XSRF-TOKEN", token)
//           }
//         }
//       }
//     ]
//   }
// })
