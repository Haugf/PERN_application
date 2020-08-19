FROM node

# Install Packages
WORKDIR /tmp
COPY frontend/package*.json /tmp/
RUN npm install

# Run npm install in a temp folder to prevent docker-compose bind mounting from overwriting with source node_modules folder. Copy from here later.

#Create Working Dir
WORKDIR /frontend
# App Source
COPY frontend/ ./
# node_modules folder is not copied as it is in .dockerignore

# Move Packages to Working Dir
RUN cp -a /tmp/node_modules /frontend/node_modules

# Expose Port
EXPOSE 8080

# Build node app
RUN npm run build

# Start command (CMD[""] is the default command that will be run when the container is started)
# npm start runs the script 'start' in our frontend's package.json file.
# This is overwritten in our docker-compose.yml.
CMD [ "npm", "start"]