interface ENV_TYPE {
  APP_URL: string
  BACKEND_URL: string
}

declare global {
  interface Window {
    ENV: ENV_TYPE
  }
}

function isBrowser() {
  return typeof window !== "undefined"
}

function getEnv() {
  return isBrowser()
    ? window.ENV
    : ({
        APP_URL: process.env.APP_URL,
        BACKEND_URL: process.env.BACKEND_URL
      } as ENV_TYPE)
}

export default getEnv
