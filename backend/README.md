# MAS Assessment Backend

## Development

1. Clone codebase from repository
1. Run `npm install` to install dependencies
1. Run `npm run dev` to start the local development server

## Deployment using Docker

It is recommended to deploy the frontend and backend together, but they can be deployed individually.

### Development

1. Create a `Dockerfile` in the `backend` folder:

   ```
   FROM node:18-alpine
   WORKDIR /backend/

   COPY . /backend/
   ENV PORT=8080

   RUN npm install
   COPY . .
   CMD ["node", "index.js"]
   ```

1. Create a `.dockerignore` in the `backend` folder:

   ```
   /node_modules
   ```

1. Deploying individually
   1. Run `docker image build -t mas-backend:latest .`
   1. Run `docker run -dp 8080:8080 --name mas-backend-container mas-backend:latest`
1. Deploying together with the backend, refer to the README.md in the root folder.
1. Check that container is built and running on Docker Desktop

### Production

The production build uses nginx to build the React frontend for production.

1. Create a `Dockerfile` in the `backend` folder:

   ```
   FROM node:18-alpine
   WORKDIR /backend/

   COPY . /backend/
   ENV PORT=8080

   RUN npm ci --omit=dev
   COPY . .

   RUN npm install pm2 -g
   CMD pm2 start process.yml && tail -f /dev/null
   ```

1. Create a `.dockerignore` in the `backend` folder:
   ```
   /node_modules
   ```
1. Create a `process.yml` in the backend folder:

   ```
   apps:
   - script: index.js
   instances: 2
   exec_mode: cluster
   ```

1. Deploying individually
   1. Run `docker image build -t mas-backend:latest .`
   1. Run `docker run -dp 8080:8080 --name mas-backend-container mas-backend:latest`
1. Deploying together with the backend, refer to the README.md in the root folder.
1. Check that container is built and running on Docker Desktop
