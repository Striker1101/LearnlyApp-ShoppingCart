# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose ports for backend and frontend
EXPOSE 8080
EXPOSE 8081

# Define the command to run the app
CMD ["npm", "run", "dev"]
