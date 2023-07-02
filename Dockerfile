###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install default package
RUN npm install -g npm@9.7.2 && npm install -g typeorm@0.3.17

# Install the development dependencies
RUN npm ci

# Copy the rest of the application code into the container
COPY . .

# Build the app in development mode
RUN npm run build


###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /app

COPY package*.json ./

COPY --from=development /app/node_modules ./node_modules

COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Only install node packages for production
RUN npm install --omit=dev && npm cache clean --force


###################
# PRODUCTION
###################

FROM node:18-alpine AS production

# Set the working directory to the app directory
WORKDIR /app

# Install default package
RUN npm install -g typeorm@0.3.17 && npm install -g pm2@5.3.0

# Copy the bundled code from the build stage to the production image
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

COPY . .


# Run the app with pm2
# CMD ["npm", "run", "pm2"]