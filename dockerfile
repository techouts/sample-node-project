# Use a modern Node version (fixes "Cannot find module 'node:events'")
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependencies first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the app's port
EXPOSE 3005

# Run the application
CMD ["node", "app.js"]
