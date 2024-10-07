# MVP Portal Project

This project contains two main components: a backend built with NestJS (nestjs-mvp-portal) and a frontend built with React (react-mvp-portal). Both components are containerized using Dockerfile, and a `docker-compose.yml` file in root folder is provided to run both services with a single command.

## Project Structure

```
/nestjs-mvp-portal      # Backend (NestJS) folder
   └── Dockerfile
/react-mvp-portal       # Frontend (React) folder
   └── Dockerfile
/docker-compose.yml     # Docker Compose file to run both backend and frontend
```

- **Backend**: NestJS application, running on port `3001`.
- **Frontend**: React application, running on port `3000`.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

## Getting Started

Follow the steps below to set up and run the project:

### Step 1: Clone the repository

```bash
git clone https://github.com/QuocTung95/mvp_assessment.git
cd mvp_assessment
```

### Step 2: Build and run the containers

To build and run both the backend and frontend services, navigate to the root directory where the `docker-compose.yml` file is located and run the following command:

```bash
docker-compose up --build
```

This will build the Docker images for both the backend and frontend, then start the containers.

### Step 3: Access the applications

Once the containers are up and running, you can access the applications at:

- **Frontend (React)**: `http://localhost:3000`
- **Backend (NestJS)**: `http://localhost:3001`

### Step 4: Stopping the containers

To stop the running containers, run:

```bash
docker-compose down
```

## Development

- If you make changes to the code and want to rebuild the containers, use the `--build` flag:

```bash
docker-compose up --build
```

- To view container logs, use:

```bash
docker-compose logs -f
```

## Troubleshooting

- If ports `3000` or `3001` are already in use, you may need to stop the services using those ports or adjust the ports to the other port

- Ensure Docker and Docker Compose are installed and running correctly.

## Conclusion

This README file provides basic steps to run the full MVP Portal project using Docker and Docker Compose. Make sure to follow the instructions carefully, and you should have both the frontend and backend services running locally.
