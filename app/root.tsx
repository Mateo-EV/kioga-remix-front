import "@fontsource/poppins/100.css"
import "@fontsource/poppins/200.css"
import "@fontsource/poppins/300.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/800.css"
import "@fontsource/poppins/900.css"

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs
} from "react-router"

import type { Route } from "./+types/root"
import stylesheet from "./app.css?url"
import getEnv from "./lib/env"

import "react-loading-skeleton/dist/skeleton.css"
import { Toaster } from "sonner"
import { getSession } from "./data/server/auth"
import AuthProvider from "./providers/auth-provider"
import ThemeProvider from "./providers/theme-provider"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request)

  return { session }
}

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet }
]

export function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useLoaderData<typeof loader>()

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(getEnv())}`
          }}
        />
      </head>
      <body className="antialiased relative min-w-72 font-sans">
        <AuthProvider session={session}>
          <ThemeProvider>
            {children}
            <Toaster richColors />
          </ThemeProvider>
          <ScrollRestoration />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
