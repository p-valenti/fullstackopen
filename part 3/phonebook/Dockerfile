# Step 1: Build the client
FROM node:20 AS build-client
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client ./
RUN npm run build

# Step 2: Build the server
FROM node:20 AS build-server
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci

# Copy the built client files to the server
COPY --from=build-client /app/client/dist /app/client/dist

# Copy the server code
COPY server /app/server

# Expose necessary port and set the command to start the server
EXPOSE 3001
CMD ["node", "server/server.js"]