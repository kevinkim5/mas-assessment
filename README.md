# MAS Assessment

This repository contains the codes for the frontend and backend for the technical assessment.
There are specific READMEs in the frontend and backend folders to guide developers on setting up for development.

## Deployment using Docker

This project uses Docker to build both the frontend and backend images and containers together.

1. Create a `docker-compose.yml` in the root folder (i.e. same level as this `README.md`). Take note that items in [square braces] are placeholders and need to be replaced

   ```
   version: "3.8"

   services:
     client:
       build:
         context: ./frontend
         dockerfile: ./Dockerfile
       container_name: [your-container-name]
       image: [your-image-name]
       expose:
         - [your-port]
       ports:
         - [your-port]

     server:
       build:
         context: ./backend
         dockerfile: ./Dockerfile
       container_name: [your-container-name]
       image: [your-image-name]
       expose:
         - [your-port]
       ports:
         - [your-port]
   ```

1. Check that each of the frontend and backend folders have their own `Dockerfile` and `.dockerignore` before attempting to build the images and containers.
1. Run `docker-compose down && docker-compose build --no-cache && docker-compose up` to build the new images/containers and start the containers.
