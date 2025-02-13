# Use Node.js slim image for building
FROM --platform=linux/amd64 node:slim as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to optimize Docker layer caching
COPY package.json package-lock.json ./

# Install npm and dependencies
RUN npm install -g npm@8.13.2
RUN npm install --force

# Copy remaining files
COPY . .

# **Build the Next.js application**
RUN npm run build

# ---- Runner Stage ----
FROM node:slim as runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV TARGET_ENV=dev

# Copy built application from the builder stage
COPY --from=builder /app /app

# Copy only the necessary runtime files
COPY package.json /app/

# Copy entrypoint script and make it executable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Start the application
ENTRYPOINT [ "/docker-entrypoint.sh" ]
