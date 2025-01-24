import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import useAuth from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { Link } from "react-router"
import NavbarUserDropdown from "./navbar-dropdown-user"

function NavbarUser() {
  const { session, isLoading } = useAuth()

  if (isLoading)
    return (
      <Skeleton containerClassName="size-10" className="size-full" circle />
    )

  if (!session)
    return (
      <Link
        className={cn(buttonVariants({ size: "sm", className: "mr-1" }))}
        to="/login"
        viewTransition
      >
        Unirse
      </Link>
    )

  return <NavbarUserDropdown session={session} />
}

export default NavbarUser
