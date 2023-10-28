# Rebuild the source code only when needed
FROM node:18.13.0 AS builder
WORKDIR /usr/app
COPY package.json yarn.lock ./
COPY . .
RUN npm install --force
RUN npm run build

FROM node:18.13.0 AS runner
WORKDIR /usr/app
COPY --from=builder /usr/app/dist .
COPY package.json .
COPY .env .
RUN npm install --force
EXPOSE 3333
CMD ["npm", "start"]