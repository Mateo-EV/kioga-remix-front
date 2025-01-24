import { Avatar } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { LogOutIcon, ShoppingBasketIcon, UserIcon } from "lucide-react"
import { useState, useTransition } from "react"
import { api } from "@/lib/ky"
import type { Session } from "@/data/types"
import { Link } from "react-router"

function NavbarUserDropdown({ session }: { session: Session }) {
  const [isLogginOut, startLogginOut] = useTransition()

  const [profileModalOpen, setProfileModalOpen] = useState(false)

  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault()
    startLogginOut(async () => {
      await api.post("/logout")
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar name={session.name} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={10}>
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2"
            onClick={() => setProfileModalOpen(true)}
          >
            <UserIcon className="size-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2" asChild>
            <Link to="/pedidos">
              <ShoppingBasketIcon className="size-4" />
              <span>Pedidos</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2" onClick={handleLogOut}>
            {isLogginOut ? (
              <LoadingSpinner />
            ) : (
              <LogOutIcon className="size-4" />
            )}
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perfil de Usuario</DialogTitle>
            <DialogDescription>Información personal</DialogDescription>
          </DialogHeader>
          {/* <NavbarProfileForm user={user} /> */}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NavbarUserDropdown
