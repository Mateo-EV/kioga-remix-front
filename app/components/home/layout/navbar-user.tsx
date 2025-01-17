import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router"

function NavbarUser() {
  const user = null

  if (!user)
    return (
      <Link
        className={cn(buttonVariants({ size: "sm", className: "mr-1" }))}
        to="/login"
        viewTransition
      >
        Unirse
      </Link>
    )

  // return <NavbarUserDropdown user={user} />;
  return null
}

export default NavbarUser
