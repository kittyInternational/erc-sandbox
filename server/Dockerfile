# Use an official Node.js runtime as the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Define the command to start your app using "yarn start"
CMD ["yarn", "start"]