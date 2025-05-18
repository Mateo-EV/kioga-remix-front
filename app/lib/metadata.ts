import { SITE_CONFIG } from "@/data/const"
import getEnv from "./env"

type MetaGeneratorProps = {
  title?: string
}

export function MetaGenerator(props?: MetaGeneratorProps) {
  const { title } = props || {}
  const app_url = getEnv().APP_URL
  return [
    { title: "Kioga" + (title ? ` | ${title}` : "") },
    { name: "description", content: SITE_CONFIG.description },
    {
      name: "keywords",
      content:
        "Kioga, Computación, Hardware, Electrónica, Laptops, PC, Monitores, Componentes, Placas, Procesadores, Almacenamiento, Memoria"
    },
    { name: "author", content: "mateoEv" },
    { name: "creator", content: "mateoEv" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_PE" },
    { property: "og:url", content: app_url },
    { property: "og:title", content: SITE_CONFIG.name },
    { property: "og:description", content: SITE_CONFIG.description },
    { property: "og:site_name", content: SITE_CONFIG.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SITE_CONFIG.name },
    { name: "twitter:description", content: SITE_CONFIG.description },
    { name: "twitter:image", content: app_url + SITE_CONFIG.ogImage },
    { rel: "icon", href: "/favicon.ico" },
    { rel: "shortcut icon", href: "/favicon-16x16.png" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: `${app_url}/site.webmanifest` }
  ]
}
