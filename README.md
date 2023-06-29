# Project Name

Namastecorp assignment

## Prerequisites

Before you begin, make sure your development environment includes the following:

- Docker
- Docker Compose

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/project-name.git
```

2. Create a `.env` file in the root of the project, following the example in `.env.example`, and fill in the necessary environment variables.

3. Build and start the development containers with Docker Compose:

```bash
docker-compose up -d api_dev
```

This will build the Docker images and start the containers for the development environment.

4. Access the Nest.js application at `http://localhost:3000`.

## Migration

Need run all command bellow inside container

1. Generate a migration file for initializing the database schema:

```
npm run migration:generate -- src/db/migrations/<fileName>

```

2. Create a migration file:

```
npm run migration:create -- src/db/migrations/<fileName>

```

3. Run migration file

```
npm run migration:run

```

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
