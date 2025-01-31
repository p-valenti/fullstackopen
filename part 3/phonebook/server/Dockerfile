# Step 1: Build the client
FROM node:20 AS build-client
WORKDIR /app/client
COPY ../client/package.json ../client/package-lock.json ./   # Adjust paths for package.json
RUN npm ci
COPY ../client ./  # Adjust paths to copy the entire client folder
RUN npm run build  # Build the client

# Step 2: Build the server
FROM node:20 AS build-server
WORKDIR /app/server
COPY package.json package-lock.json ./  # Copy server package files
RUN npm ci  # Install server dependencies

# Copy the built client files to the server
COPY --from=build-client /app/client/dist /app/client/dist  # Adjust for build output

# Copy the server code
COPY . /app/server

# Expose necessary port and set the command to start the server
EXPOSE 5000
CMD ["node", "server.js"]  # Assuming your entry point is server.js
