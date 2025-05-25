import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router"
import NavbarUserDropdown from "./navbar-dropdown-user"
import { useAuth } from "@/providers/auth-provider"

function NavbarUser() {
  const session = useAuth()
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
