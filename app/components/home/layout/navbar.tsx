import { NAV_ITEMS_CONTENT, SITE_CONFIG, THEME_COLORS_HEX } from "@/data/const"
import { ChevronDownIcon } from "lucide-react"
import { Link } from "react-router"
import NavbarScroll from "./navbar-scroll"
import NavbarUser from "./navbar-user"
import NavbarSearch from "./navbar-search"
import NavbarMobileItems from "./navbar-mobile-items"

function Navbar() {
  return (
    <header className="sticky top-0 z-20 w-full bg-background transition-colors md:bg-transparent md:data-[scrolled=true]:bg-background">
      <div className="header-border-gradient border-b transition-[border-color] md:border-border">
        <nav className="container flex h-16 items-center md:h-20">
          <Link
            to="/"
            className="w-full max-w-24 text-center text-2xl font-bold lg:order-2"
            viewTransition
          >
            {SITE_CONFIG.name}
          </Link>
          <ul className="hidden h-full w-full items-center gap-6 md:ml-4 md:flex lg:order-1 lg:ml-0">
            {NAV_ITEMS_CONTENT.map(navItemProps => (
              <NavItem {...navItemProps} key={navItemProps.content} />
            ))}
          </ul>
          <div className="order-3 flex w-full animate-fade-in items-center justify-end opacity-0 delay-500 fill-mode-forwards">
            <NavbarUser />
            <NavbarSearch />
            {/* <NavbarCart /> */}
            <NavbarMobileItems />
          </div>
        </nav>
      </div>
      <NavbarScroll />
    </header>
  )
}

type NavItemProps = (typeof NAV_ITEMS_CONTENT)[number]

function NavItem({ content, extra, links }: NavItemProps) {
  return (
    <li className="group h-full text-sm font-semibold">
      <div className="relative flex h-full cursor-pointer items-center">
        <span>{content}</span>
        <ChevronDownIcon
          className="ml-2 inline size-4 transition-transform group-hover:rotate-180"
          stroke={`url(#gradient-for${content})`}
        >
          <linearGradient id={"gradient-for" + content}>
            <stop offset="0%" stopColor={THEME_COLORS_HEX.primary} />
            <stop offset="100%" stopColor={THEME_COLORS_HEX.secondary} />
          </linearGradient>
        </ChevronDownIcon>
        <div className="absolute bottom-6 left-1/2 right-1/2 h-[1px] bg-gradient-to-r from-primary to-secondary transition-[left_right] group-hover:left-0 group-hover:right-0" />
      </div>
      {extra ? (
        <div className="absolute left-0 right-0 top-[81px] bg-background z-30 max-h-0 overflow-hidden opacity-0 shadow-md transition-[max-height_opacity] group-hover:max-h-72 group-hover:opacity-100 group-hover:delay-150">
          <ul className="container grid grid-cols-4 gap-8 py-4">
            {extra.map(({ links, title }) => (
              <li key={title}>
                <span className="font-bold">{title}</span>
                <ul className="mt-4 space-y-2 font-normal">
                  {links.map(({ href, text }) => (
                    <li key={text}>
                      <Link
                        to={href}
                        className="underline-offset-4 hover:underline"
                        viewTransition
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="absolute top-[81px] z-30 bg-background max-h-0 overflow-hidden opacity-0 shadow-md transition-[max-height_opacity] group-hover:max-h-72 group-hover:opacity-100 group-hover:delay-150">
          <ul className="space-y-2 p-4 font-normal">
            {links.map(({ href, text }) => (
              <li key={text}>
                <Link
                  to={href}
                  className="underline-offset-4 hover:underline"
                  viewTransition
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

export default Navbar
