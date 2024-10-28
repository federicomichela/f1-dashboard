# Formula 1 Race Results App

This project is a full-stack web application that allows Formula 1 enthusiasts to find the winner of any
Formula 1 race by fetching race data from the F1 Motorsport Data API.

## Table of Contents

- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [How to Run the App](#how-to-run-the-app)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Using Docker Compose](#using-docker-compose)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

---

## Architecture

### Overview

This project follows a **microservices-style architecture** with separate frontend and backend services.
Each service is containerized using **Docker** for consistency across environments.
It also uses a monorepo VCS strategy with workspaces to optimise shared dependencies across modules.

- **Frontend**: Built with **React.js**, this service provides the user interface and handles routing.
- **Backend**: Built with **Node.js** and **Express**, the backend interacts with the F1 Motorsport Data API
to fetch race data and provides it to the frontend in a more digestible format.
- **State Management**: The frontend uses **Redux Toolkit** for managing global state across multiple pages,
ensuring efficient and scalable state management.

### Key Architectural Decisions

1. **Microservices Approach**: The frontend and backend are separated into distinct services,
enabling independent development, testing, and deployment.
This also makes the app more scalable for future improvements.
2. **Docker**: Both frontend and backend are containerized using Docker, ensuring consistent environments across
development and production, and simplifying deployment with **Docker Compose**.
3. **Redux for State Management**: **Redux Toolkit** is used on the frontend to handle application-wide state,
particularly to manage race data fetched from the backend.

---

## Technologies Used

- **Frontend**: TypeScript, React, Redux Toolkit, Tailwind, Axios
- **Backend**: Node.js, Express, Axios, TypeScript
- **State Management**: Redux Toolkit
- **Containerization**: Docker, Docker Compose
- **API**: F1 Motorsport Data API
(via [RapidAPI](https://rapidapi.com/belchiorarkad-FqvHs2EDOtP/api/f1-motorsport-data))

---

## How to Run the App

You can run the app either manually (backend and frontend separately) or via **Docker Compose** for a simpler setup.

### Backend Setup

1. Navigate to the `f1-backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:

    ```bash
    npm start
    ```

The backend should now be running on [http://localhost:10000](http://localhost:10000).

### Frontend Setup

1. Navigate to the `f1-frontend` folder.
2. Install dependencies:

    ```bash
    npm install
    ```
3. Start the frontend server:

    ```bash
    npm run dev
    ```

The frontend should now be running on [http://localhost:3000](http://localhost:3000).

### Using Docker Compose

To run both the frontend and backend together via **Docker Compose**:

1. Ensure you're in the project root (where `docker-compose.yml` is located).
2. Build and start the services:

    ```bash
    docker-compose up --build
    ```

The frontend will be available at [http://localhost:3000](http://localhost:3000)
and the backend at [http://localhost:10000](http://localhost:10000).

### Stopping the Services

To stop the Docker services:

```bash
docker-compose down
```
---

## API Endpoints
- **GET /api/races/:year:** Fetch races for the specified year
    - **Query Parameters:**
        - **year:** The year of the race.
- **GET /api/races/:raceId/competitions:** Fetch the competitions for the specified year.
Competitions will include participants and winner.
    - **Query Parameters:**
        - **raceId:** The race id

Example:
```bash
GET /api/winner?year=2024&raceName=Monaco
```

---

## Future Improvements
- Tests: Add end-to-end tests using Cypress or Playwright for better reliability.
- CI/CD: Add github actions configuration for continuous integration and deployments.
- IaC & Environment variables: to deploy the modules on a staging and production environment.
- Caching: Implement server-side caching to reduce the number of API requests.
