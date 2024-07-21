# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

COPY ./dist ./dist
# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install -g serve

EXPOSE 3000

# Start the app using serve command
CMD [ "serve", "-s", "dist" ]