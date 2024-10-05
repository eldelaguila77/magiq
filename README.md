# README.md

This README file provides instructions on how to set up and run the project using Docker and Docker Compose.

## Prerequisites
Before running the project, make sure you have Docker and Docker Compose installed on your system.

## Installation
1. Open a terminal and navigate to the project directory.
2. Run the following command to install the project dependencies:
    ```
    npm install
    ```

## Running the Project
1. Start the Docker containers by running the following command in a terminal:
    ```
    docker-compose up --build
    ```
2. In another terminal, generate the migrations by running the following command:
    ```
    docker-compose exec api npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migration/InitialMigration -d src/config/typeorm.ts
    ```
3. Once the migrations are generated, press `Ctrl+C` to stop the Docker containers.
4. Start the Docker containers again by running the following command:
    ```
    docker-compose up --build
    ```

## Note for Linux Users
If you are using Linux, you may need to comment out or adjust the following line in the `docker-compose.yml` file:
```
entrypoint: ["./wait-for", "db:3306", "--", "sh", "-c", "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/config/typeorm.ts && npm run dev"]
```

## Environment Variables
Create a `.env` file based on the contents of the `.env.example` file.

## Platform
In the `docker-compose.yml` file, set the `platform` to `linux/x86_64`.
