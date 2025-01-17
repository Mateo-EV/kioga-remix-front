import { ThemeProvider as NextThemeProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="system"
    >
      {children}
    </NextThemeProvider>
  )
}
