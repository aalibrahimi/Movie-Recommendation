# Base image for Node.js
FROM node:18

# Set the working directory inside the recommendation-api folder
WORKDIR /app/recommend-api

# Copy the package.json from the recommend-api folder
COPY recommend-api/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY recommend-api/ .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
