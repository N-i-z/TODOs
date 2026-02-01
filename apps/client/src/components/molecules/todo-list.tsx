"use client";

import { TodoCard } from "@/src/components/atoms/todo-item";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Todo } from "@/src/types/todo.types";

interface TodoListProps {
  todos: Todo[];
  loading?: boolean;
  onRefresh?: () => void;
}

export default function TodoList({ todos, loading, onRefresh }: TodoListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {todos.map((t) => (
        <TodoCard key={t.id} todo={t} onRefresh={onRefresh} />
      ))}
    </div>
  );
}
