# MAS Assessment Frontend

## Development

1. Clone codebase from repository
1. Run `npm install` to install dependencies
1. Run `npm run dev` to start the local development server

## Deployment using Docker

It is recommended to deploy the frontend and backend together, but they can be deployed individually.

### Development

1. Create a `Dockerfile` in the `frontend` folder:

   ```
   FROM node:18-alpine
   WORKDIR /frontend/

   COPY src/ /frontend/src
   COPY . /frontend/

   RUN npm install

   CMD ["npm", "run", "dev"]
   ```

1. Create a `.dockerignore` in the `frontend` folder:

   ```
   /node_modules
   ```

1. Deploying individually
   1. Run `docker image build -t mas-frontend:latest .`
   1. Run `docker run -dp 5173:5173 --name mas-frontend-container mas-frontend:latest`
1. Deploying together with the backend, refer to the README.md in the root folder.
1. Check that container is built and running on Docker Desktop

### Production

The production build uses nginx to build the React frontend for production.

1. Create a `Dockerfile` in the `frontend` folder:

   ```
    FROM node:18-alpine as build
    WORKDIR /frontend/

    COPY src/ /frontend/src
    COPY . /frontend/

    RUN npm ci
    RUN npm run build

    FROM nginx:1.23.1-alpine

    COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
    COPY --from=build /frontend/dist /usr/share/nginx/html

    CMD ["nginx", "-g", "daemon off;"]
   ```

1. Create a `.dockerignore` in the `frontend` folder:

   ```
   /node_modules
   ```

1. Create a `nginx` folder and create a `default.conf` file

   ```
   server {
     listen [your-port];
     server_name [your-server];
       location / {
           root /usr/share/nginx/html;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
       location /api/ {
           proxy_pass [your-backend-api];
       }
   }
   ```

1. Deploying individually
   1. Run `docker image build -t mas-frontend:latest .`
   1. Run `docker run -dp 5173:5173 --name mas-frontend-container mas-frontend:latest`
1. Deploying together with the backend, refer to the README.md in the root folder.
1. Check that container is built and running on Docker Desktop
