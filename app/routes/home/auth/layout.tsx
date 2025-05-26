import GamingSetUpImage from "@/assets/img/gaming-setup.png"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/providers/auth-provider"
import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"

export default function HomeAuthLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const session = useAuth()

  useEffect(() => {
    if (session && location.pathname === "/login") {
      navigate("/")
    }

    if (session && location.pathname === "/register") {
      navigate("/")
    }
  }, [session])

  return (
    <>
      <section className="container flex justify-center py-12">
        <Card className="basis-2/5 py-6 lg:rounded-r-none">
          <CardContent className="grid place-items-center">
            <Outlet />
          </CardContent>
        </Card>
        <div className="hidden basis-3/5 overflow-hidden rounded-r-md lg:block">
          <img
            src={GamingSetUpImage}
            alt="gaming-setup"
            className="object-cover"
            sizes="(min-width: 1400px) 1080px, (min-width: 992px) 640px, 0"
          />
        </div>
      </section>
    </>
  )
}
