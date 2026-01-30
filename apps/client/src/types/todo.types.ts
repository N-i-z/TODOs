export type TodoPriority = "low" | "medium" | "high" | string;

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority?: TodoPriority;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export type CreateTodoInput = {
  title: string;
  description?: string;
  priority?: TodoPriority;
  status?: string;
};

export type UpdateTodoInput = Partial<CreateTodoInput> & {
  completed?: boolean;
};
