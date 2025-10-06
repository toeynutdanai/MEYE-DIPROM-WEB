# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# ติดตั้ง dependencies สำหรับ build (Alpine ต้องใช้)
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy package.json และ yarn.lock (ถ้ามี)
COPY package.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build React app
RUN yarn build

# Stage 2: Serve
FROM node:22-alpine

WORKDIR /app

# ติดตั้ง serve สำหรับ static file
RUN apk add --no-cache python3 make g++ libc6-compat \
    && yarn global add serve

# Copy build output
COPY --from=builder /app/build .

# ใช้ PORT ของ Railway
EXPOSE 3000
CMD ["sh", "-c", "serve -s . -l ${PORT:-3000}"]