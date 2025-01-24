import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export default function FloatingThemeButton() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () =>
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"))

  return (
    <div className="fixed bottom-4 left-4 z-[200]">
      <Button
        variant="outline"
        size="circle"
        onClick={toggleTheme}
        className={
          theme === "dark"
            ? "bg-[#F5F5F4] text-[#1C1917] hover:bg-[#F5F5F4] hover:text-[#1C1917]"
            : "bg-[#292524] text-[#FAFAF9] hover:bg-[#292524] hover:text-[#FAFAF9]"
        }
      >
        <MoonIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <SunIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Cambiar tema</span>
      </Button>
    </div>
  )
}
