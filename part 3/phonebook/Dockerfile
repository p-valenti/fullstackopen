# Stage 1: Build the client (Vite)
FROM node:20.12.0-slim AS build-client

# Set working directory to client
WORKDIR /app/client

# Copy client package files and install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm ci

# Build the client
COPY client /app/client
RUN npm run build

# Stage 2: Build the server
FROM node:20.12.0-slim AS build-server

# Set working directory to server
WORKDIR /app

# Copy server package files and install dependencies
COPY server/package.json server/package-lock.json ./server/
RUN npm ci --prefix ./server

# Copy the built client files from the build-client stage
COPY --from=build-client /app/client/dist /app/client/dist

# Copy the server code to the final server image
COPY server /app/server

# Set environment to production
ENV NODE_ENV=production

# Expose the necessary port
EXPOSE 3000

# Set the correct entry point to start the server (index.js)
CMD ["node", "server/index.js"]
