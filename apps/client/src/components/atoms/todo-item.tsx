"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Pencil, X, Check, Trash } from "lucide-react";
import { useMutateTodos } from "@/src/hooks/usemutatetodos";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";
import { Todo } from "@/src/types/todo.types";

interface TodoCardProps {
  todo: Todo;
  onRefresh?: () => void;
}

export function TodoCard({ todo, onRefresh }: TodoCardProps) {
  const { markDone, markUndone, updateTodo, softDelete, hardDelete, restore } =
    useMutateTodos();
  const [editing, setEditing] = React.useState(false);
  const [title, setTitle] = React.useState(todo.title);
  const [description, setDescription] = React.useState(todo.description || "");

  const handleMarkDone = async () => {
    const res = await markDone(todo.id);
    if (res) {
      toast.success("Marked as completed", { description: todo.title });
      onRefresh?.();
    }
  };
  const handleMarkUndone = async () => {
    const res = await markUndone(todo.id);
    if (res) {
      toast.info("Marked as pending", { description: todo.title });
      onRefresh?.();
    }
  };
  const handleSaveEdit = async () => {
    const res = await updateTodo(todo.id, { title, description });
    if (res) {
      toast.success("Todo updated", { description: title });
      setEditing(false);
      onRefresh?.();
    }
  };
  const handleDelete = async () => {
    const ok = await softDelete(todo.id);
    if (ok) {
      toast.warning("Todo deleted", {
        description: "Are you sure you want to delete this todo?",
        action: {
          label: "Confirm",
          onClick: async () => {
            const h = await hardDelete(todo.id);
            if (h) toast.success("deleted", { description: todo.title });
            onRefresh?.();
          },
        },
        cancel: {
          label: "Undo",
          onClick: async () => {
            const r = await restore(todo.id);
            if (r) toast.success("Restored", { description: todo.title });
            onRefresh?.();
          },
        },
      });
      onRefresh?.();
    }
  };
  return (
    <Card
      className={cn("bg-background text-foreground w-xl")}
      data-id={todo.id}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {editing ? (
              <div className="flex flex-col gap-2">
                <input
                  className="h-10 rounded-md border px-3 bg-background text-foreground"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="min-h-24 rounded-md border px-3 py-2 bg-background text-foreground"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
            ) : (
              <>
                <CardTitle>{todo.title}</CardTitle>
                {todo.description ? (
                  <CardDescription>{todo.description}</CardDescription>
                ) : null}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={!!todo.completed}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  handleMarkDone();
                } else if (checked === false) {
                  handleMarkUndone();
                }
              }}
              aria-label={todo.completed ? "Mark as pending" : "Mark as done"}
            />
            {editing ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Cancel edit"
                  onClick={() => setEditing(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  aria-label="Save todo"
                  onClick={handleSaveEdit}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit todo"
                onClick={() => setEditing(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="destructive"
              size="icon"
              aria-label="Delete todo"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 text-sm">
          <span
            className={cn(
              todo.completed
                ? "text-success bg-success-muted border border-success p-1 rounded-md"
                : "text-warning bg-warning-muted border border-warning p-1 rounded-md",
            )}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
