"use client";

import { useState } from "react";
import { useMutateTodos } from "@/src/hooks/usemutatetodos";
import { CreateTodoInput } from "@/src/types/todo.types";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { z } from "zod";

interface CreateTodoFormProps {
  onCreated?: () => void;
}

export default function CreateTodoForm({ onCreated }: CreateTodoFormProps) {
  const { createTodo, error, loading } = useMutateTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>("");
  const [errors, setErrors] = useState<{ title?: string; priority?: string }>(
    {},
  );

  const schema = z.object({
    title: z.string().min(1, "Title is required").max(120, "Title is too long"),
    description: z.string().optional(),
    priority: z
      .enum(["low", "medium", "high"])
      .optional()
      .or(z.literal("").transform(() => undefined)),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ title, description, priority });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = i.message;
      });
      setErrors({ title: fieldErrors.title, priority: fieldErrors.priority });
      toast.error("Please fix the form errors");
      return;
    }
    setErrors({});

    const input: CreateTodoInput = {
      title: parsed.data.title,
      description: parsed.data.description || undefined,
      priority: parsed.data.priority as any,
    };
    const res = await createTodo(input);
    if (res) {
      toast.success("Todo created", { description: res.title });
      setTitle("");
      setDescription("");
      setPriority("");
      onCreated?.();
    } else if (error) {
      toast.error("Failed to create", { description: error.message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="h-10 rounded-md border px-3 bg-background text-foreground"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          {errors.title ? (
            <span className="text-xs text-danger">{errors.title}</span>
          ) : null}
          <select
            className="h-10 rounded-md border px-3 bg-background text-foreground"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Priority (optional)</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority ? (
            <span className="text-xs text-danger">{errors.priority}</span>
          ) : null}
          <textarea
            className="min-h-24 rounded-md border px-3 py-2 bg-background text-foreground"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
