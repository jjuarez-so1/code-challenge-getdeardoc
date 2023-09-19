# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express API will listen on
EXPOSE 2002

# Specify the command to run the Express API when the container starts
CMD ["npm", "run", "dev"]
