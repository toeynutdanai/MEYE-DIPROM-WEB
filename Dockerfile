# # Base image
# FROM node:16-alpine as builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install --legacy-peer-deps

# # Copy source code
# COPY . .

# # Build the application
# RUN npm run build

# # Serve the application using a static server
# FROM node:16-alpine
# RUN npm install -g serve
# COPY --from=builder /app/build /app/build
# WORKDIR /app/build
# EXPOSE 5000
# CMD ["serve", "-s", "."]

# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install yarn
RUN npm install -g yarn

# Copy package.json (และ yarn.lock ถ้ามี)
COPY package.json ./ 


# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build app
RUN yarn build

# Stage 2: Serve
FROM node:22-alpine

WORKDIR /app

# Install serve
RUN yarn global add serve

# Copy build output
COPY --from=builder /app/build .

# Use $PORT for Railway dynamic port
EXPOSE 3000
CMD ["sh", "-c", "serve -s . -l ${PORT:-3000}"]
