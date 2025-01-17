import SubscribeImage from "@/assets/img/suscribe.png"
import { H1, H2, Paragraph } from "@/components/home/typography"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ABOUT_US_DATA } from "@/data/const"
import { cn } from "@/lib/utils"
import { ComputerIcon, Layers2Icon } from "lucide-react"
import { Link } from "react-router"
import GradientDecorator from "../gradient-decorator"

export function StartSection() {
  return (
    <section className="container space-y-6 py-12">
      <H1
        className="animate-fade-in opacity-0 fill-mode-forwards"
        style={{ lineHeight: 1.25 }}
      >
        Lo Mejor de <br />
        <span className="text-primary">Última Generación</span> <br />
        en Computación
      </H1>
      <div className="max-w-[600px] animate-fade-in opacity-0 delay-200 fill-mode-forwards">
        <Paragraph>
          Nuestro catálogo incluye una amplia gama de productos en el ámbito de
          la computación, como componentes, periféricos, equipos y mucho más.
        </Paragraph>
      </div>
      <div className="animate-fade-in space-y-2 opacity-0 delay-300 fill-mode-forwards">
        <Link
          to="/productos"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full xs:mr-4 xs:w-auto"
          )}
          viewTransition
        >
          Ver Productos <ComputerIcon />
        </Link>
        <Link
          to="/categorias"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "w-full xs:w-auto"
          )}
          viewTransition
        >
          Ver Categorías <Layers2Icon />
        </Link>
      </div>
    </section>
  )
}

export function AboutUsSection() {
  return (
    <section className="relative py-12">
      <GradientDecorator className="left-1/2 size-[250px] -translate-x-1/2 -translate-y-1/2 xs:left-1/3 xs:top-[200px] xs:size-[300px]" />

      <div className="container space-y-8">
        <H2>Sobre Nosotros</H2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_US_DATA.map(({ title, content }, i) => (
            <Card key={i}>
              <CardContent className="space-y-2">
                <p className="mt-4 text-2xl text-primary">0{i + 1}</p>
                <p className="text-2xl font-semibold">{title}</p>
                <p className="text-pretty text-justify text-sm xs:text-base lg:text-lg">
                  {content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SubscriptionNewsLetterSection() {
  return (
    <section className="py-12">
      <div className="container flex flex-col items-center gap-16 overflow-hidden md:flex-row">
        <div className="relative h-full md:order-2 md:basis-1/2">
          <img src={SubscribeImage} alt="equipo" className="object-cover" />
        </div>
        <div className="space-y-4 md:order-1 md:basis-1/2">
          <span className="hidden rounded-lg bg-primary px-4 py-1 text-sm text-foreground xs:inline">
            Suscríbete
          </span>
          <H2>Suscríbete al boletín informativo</H2>
          <Paragraph>
            ¡Únete a nuestra comunidad exclusiva y mantente al día con las
            últimas noticias, ofertas especiales y tendencias tecnológicas!
            Suscríbete a nuestro boletín para acceder a contenido premium y
            descuentos que no encontrarás en ningún otro lugar.
          </Paragraph>
          <div className="flex flex-col gap-4 xs:flex-row">
            <Input type="text" placeholder="Ingresa tu correo electrónico..." />
            <Button>Suscríbete</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
