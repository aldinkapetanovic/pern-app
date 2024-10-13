# # Use the official Node.js image
# FROM node:alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the React app
# RUN npm run build

# # # Install serve to serve the static files
# # RUN npm install -g serve

# # Expose the port the app runs on
# EXPOSE 3000

# # # Command to run the application
# # CMD ["serve", "-s", "build"]
# CMD ["npm", "run", "start"]



# Stage 1: Build the application
FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
