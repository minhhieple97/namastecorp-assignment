# Use the official Node.js 18 image as the base image
FROM node:18-alpine AS development

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the development dependencies
RUN npm install
RUN npm i -g typeorm 

# Copy the rest of the application code into the container
COPY . .

# Start the app in development mode
CMD ["npm", "run", "start:dev"]

# Build the app for production
FROM node:18-alpine AS production

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev
RUN npm i -g typeorm 
# Copy the rest of the application code into the container
COPY . .

# Build the app
RUN npm run build


# Start the app in production mode
CMD ["npm", "run", "start:prod"]