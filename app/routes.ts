import {
  type RouteConfig,
  index,
  layout,
  route
} from "@react-router/dev/routes"

export default [
  layout("routes/home/layout.tsx", [
    index("routes/home/index.tsx"),
    route("categorias", "routes/home/categories/index.tsx")
  ])
] satisfies RouteConfig
