# Todo Nacif - FastAPI Challenge

This project is a task management API (Todo) developed with [FastAPI](https://fastapi.tiangolo.com/), using HTTP Basic authentication to protect the routes.

## Features

- CRUD for tasks (todos)
- HTTP Basic authentication on all routes
- Automatic documentation via Swagger (OpenAPI)
- Ready to run in Docker

## Folder Structure

```
todo-nacif/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── auth.py
│   └── routes/
│       ├── __init__.py
│       ├── todos.py
│       └── auth.py
├── requirements.txt
├── Dockerfile
└── README.md
```

## How to run locally

1. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

2. **Run the application:**
   ```sh
   cd app
   fastapi dev main.py
   ```

3. **Access the documentation:**
   - [http://localhost:8000/docs](http://localhost:8000/docs)

## How to run with Docker

1. **Build the image:**
   ```sh
   docker build -t todo-nacif 
   ```

2. **Run the container:**
   ```sh
   docker run -p 8000:8000 todo-nacif
   ```

3. **Access the API and documentation:**
   - [http://localhost:8000](http://localhost:8000)
   - [http://localhost:8000/docs](http://localhost:8000/docs)

## Authentication

- All routes require HTTP Basic authentication.
- Default user: `admin`
- Default password: `1234`


## Example Endpoints

- `GET /todos` - List all tasks
- `POST /todos` - Create a new task
- `PUT /todos/{todo_id}` - Update an existing task
- `DELETE /todos/{todo_id}` - Remove a task

---

Developed for study and technical challenge purposes.
