import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const AvatarNative = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
AvatarNative.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const getInitials = (name: string) => {
  const words = name.trim().split(" ")
  if (words.length === 1) {
    return words[0]!.substring(0, 2).toUpperCase()
  }
  return (words[0]![0]! + words[1]![0]!).toUpperCase()
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarNative>,
  React.ComponentPropsWithoutRef<typeof AvatarNative> & { name: string }
>(({ name, ...props }, ref) => {
  const initials = getInitials(name)

  return (
    <AvatarNative ref={ref} {...props}>
      <span className="flex h-full w-full items-center justify-center rounded-full bg-neutral-50 text-neutral-800">
        {initials}
      </span>
    </AvatarNative>
  )
})
Avatar.displayName = "Avatar"

export { Avatar, AvatarNative, AvatarImage, AvatarFallback }
