import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8000/todos";

// Helper to get headers
function getHeaders(json = false) {
  const headers: Record<string, string> = {
    Authorization: "Basic " + btoa("admin:1234"),
  };
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(API_URL, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch todos");
      return res.json();
    },
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(todo),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: getHeaders(true),
        body: JSON.stringify(todo),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

// Define the Todo type
export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};
