import {
  type RouteConfig,
  index,
  layout,
  route
} from "@react-router/dev/routes"

export default [
  layout("routes/home/layout.tsx", [
    index("routes/home/index.tsx"),
    route("categorias", "routes/home/categories/index.tsx"),
    route("productos", "routes/home/products/index.tsx"),
    route("productos/:slug", "routes/home/products/[slug]/index.tsx"),
    route("checkout", "routes/home/checkout/index.tsx"),

    layout("routes/home/auth/layout.tsx", [
      route("login", "routes/home/auth/login.tsx"),
      route("register", "routes/home/auth/register.tsx"),
      route("verificar-email", "routes/home/auth/verify-email.tsx")
    ])
  ])
] satisfies RouteConfig
