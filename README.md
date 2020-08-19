To build run:
sudo Docker-Compose build
To run run (This will update the containers being used without deleting Docker volumes):
sudo Docker-compose up
After this command, App should be running at http://0.0.0.0:8080/
To teardown run (This will delete Docker volumes):
sudo Docker-compose down