import { AlignJustifyIcon } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NAV_ITEMS_CONTENT } from "@/data/const"
import { Link } from "react-router"

function NavbarMobileItems() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="-mr-2 hover:bg-transparent md:hidden"
          size="icon"
          variant="ghost"
        >
          <span className="sr-only">Abrir menu lateral</span>
          <AlignJustifyIcon className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Accordion type="single" collapsible className="w-full">
          {NAV_ITEMS_CONTENT.map(navItemsProps => (
            <NavItem {...navItemsProps} key={navItemsProps.content} />
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}

type NavItemProps = (typeof NAV_ITEMS_CONTENT)[number]

function NavItem({ content, extra, links }: NavItemProps) {
  return (
    <AccordionItem value={content}>
      <AccordionTrigger className="text-sm font-semibold outline-none">
        {content}
      </AccordionTrigger>
      <AccordionContent className="pl-4">
        {extra ? (
          <Accordion type="single" collapsible className="w-full">
            {extra.map(({ links, title }) => (
              <AccordionItem key={title} value={title}>
                <AccordionTrigger className="text-sm" showIcon={false}>
                  {title}
                </AccordionTrigger>
                <AccordionContent className="pl-4">
                  <ul className="space-y-2">
                    {links.map(({ href, text }) => (
                      <li key={text}>
                        <Link viewTransition to={href}>
                          {text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <ul className="space-y-2">
            {links.map(({ href, text }) => (
              <li key={text}>
                <Link viewTransition to={href}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

export default NavbarMobileItems
