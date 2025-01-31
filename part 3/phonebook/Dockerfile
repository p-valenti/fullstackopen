# Step 1: Build the frontend
FROM node:20 AS build-client
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client ./
RUN npm run build

# Step 2: Build the backend
FROM node:20 AS build-server
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci

# Copy the built frontend files into the backend's public folder
COPY --from=build-client /app/client/dist /app/server/public

# Copy the backend source code
COPY server /app/server

# Expose the backend port and start the server
EXPOSE 3001
CMD ["node", "index.js"]