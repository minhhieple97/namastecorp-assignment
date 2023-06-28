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

docker-compose build --build-arg TARGET=development api_dev

3. Build and start the development containers with Docker Compose:

```bash
docker-compose up -d app-dev
```

This will build the Docker images and start the containers for the development environment.

4. Access the Nest.js application at `http://localhost:3000`.

## Usage

Describe how to use the project, including any available API endpoints or command-line interfaces.

## Development

Describe how to contribute to the project, including any development guidelines or conventions.

## Credits

Acknowledge any resources or collaborators that helped you create the project.

## License

Include the license that applies to the project (e.g., MIT, Apache 2.0, etc.).

## Contact

Provide contact information for the project maintainer or team.
