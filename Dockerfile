# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that Vite runs on (usually 5173)
EXPOSE 5173

# Start the Vite app
CMD ["npm", "run", "dev"]
