import GradientDecorator from "@/components/home/gradient-decorator"
import FloatingThemeButton from "@/components/home/layout/floating-theme-button"
import Footer from "@/components/home/layout/footer"
import Navbar from "@/components/home/layout/navbar"
import QueryProvider from "@/providers/query-provider"
import { Outlet } from "react-router"

export default function HomeLayout() {
  return (
    <QueryProvider>
      <Navbar />
      <FloatingThemeButton />
      <main>
        <GradientDecorator className="-translate-x-1/2 -translate-y-[70%] md:left-1/3 xl:size-[300px]" />
        <Outlet />
      </main>
      <Footer />
    </QueryProvider>
  )
}
