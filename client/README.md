# Todo Nacif Client

This is the **React + TypeScript** client for the Todo Nacif FastAPI Challenge.  
It allows you to manage your tasks (todos) with a simple and modern interface, consuming the FastAPI backend.

## Features

- List, create, update, and delete todos
- React Query for efficient data fetching and caching
- TypeScript for type safety
- Ready to use with the FastAPI backend

## Getting Started

### 1. Install dependencies

```sh
npm install
# or
yarn
```

### 2. Run the development server

```sh
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 3. Connect to the backend

Make sure the FastAPI backend is running (see the backend README for instructions).  
The default API URL is `http://localhost:8000`.

## Folder Structure

```
client/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── queries/
│   │   └── todos.ts
│   └── ...
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

## Authentication

- All API requests use HTTP Basic authentication.
- Default user: `admin`
- Default password: `1234`
- Credentials are set in the query helpers (see `src/queries/todos.ts`).

## Customization

- You can change the API URL and credentials in `src/queries/todos.ts`.
- Feel free to improve the UI or add new features!

---

Made for learning and technical
