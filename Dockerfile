# Use the official Node.js 18 image as the base image
FROM node:18-alpine AS development

# Set the working directory in the container
WORKDIR /app

# clear application caching
RUN npm cache clean --force

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install default package
RUN npm install -g npm@9.7.2 && \
    npm install -g typeorm@0.3.17 && \
    npm install -g pm2@5.3.0 && npm install glob rimraf

# Install the development dependencies
RUN npm install --only=development

# Copy the rest of the application code into the container
COPY . .

# Build the app in development mode
RUN npm run build

# Build the app for production
FROM node:18-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# clear application caching
RUN npm cache clean --force

# Install default package
RUN npm install -g npm@9.7.2 && \
    npm install -g typeorm@0.3.17 && \
    npm install -g pm2@5.3.0

# Install only production dependencies
RUN npm install --omit=dev

COPY . .

COPY --from=development /app/dist ./dist

CMD ["npm", "run", "pm2:prod"]