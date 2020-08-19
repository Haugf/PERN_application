FROM node

# Install Packages
WORKDIR /tmp
COPY backend/package*.json /tmp/
RUN npm install

# Run npm install in a temp folder to prevent docker-compose bind mounting from overwriting with source node_modules folder. Copy from here later.

#Create Working Dir
WORKDIR /backend

# App Source
COPY backend/ ./
# node_modules folder is not copied as it is in .dockerignore

# Move Packages to Working Dir
RUN cp -a /tmp/node_modules /backend/node_modules

# Expose Port
EXPOSE 8000

# Start command (CMD[""] is the default command that will be run when the container is started)
CMD [ "npm", "start"]