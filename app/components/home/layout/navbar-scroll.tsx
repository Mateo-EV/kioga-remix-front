import { useEffect } from "react"

const NavbarScroll = () => {
  useEffect(() => {
    const header = document.querySelector("header")!

    const setBackgroundWhileScrolling = () => {
      if (window.scrollY >= 20) {
        header.setAttribute("data-scrolled", "true")
      } else {
        header.removeAttribute("data-scrolled")
      }
    }

    setBackgroundWhileScrolling()

    window.addEventListener("scroll", setBackgroundWhileScrolling)

    return () => {
      window.removeEventListener("scroll", setBackgroundWhileScrolling)
    }
  }, [])

  return null
}

export default NavbarScroll
