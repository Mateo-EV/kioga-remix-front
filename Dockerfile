# Etapa 1: dependencias para desarrollo
FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

# Etapa 2: dependencias para producción
FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

# Etapa 3: construcción
FROM node:20-alpine AS build-env
WORKDIR /app
COPY . .
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
COPY .env.production .env  # ✅ importante si usas archivo de entorno
RUN npm run build

# Etapa 4: ejecución
FROM node:20-alpine
WORKDIR /app
COPY ./package.json ./package-lock.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
COPY --from=build-env /app/public ./public
COPY --from=build-env /app/.env ./  # solo si usas archivo
EXPOSE 3000
CMD ["npm", "run", "start"]
