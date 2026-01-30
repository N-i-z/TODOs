"use client";

import { useEffect, useMemo, useState } from "react";
import TodoList from "@/src/components/molecules/todo-list";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Button } from "@/src/components/ui/button";
import CreateTodoForm from "@/src/components/molecules/create-todo-form";
import { useFetchTodos } from "@/src/hooks/usefetchtods";

export default function TodoListContainer({
  refreshKey,
}: {
  refreshKey?: number;
}) {
  const { data: todos, loading, error, refetch } = useFetchTodos();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "priority">("newest");
  const [openForm, setOpenForm] = useState(false);

  const visible = useMemo(() => {
    let list = [...todos];
    if (filter === "pending") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);
    list.sort((a, b) => {
      if (sort === "priority") {
        const weight = { high: 3, medium: 2, low: 1 } as Record<string, number>;
        const aw = weight[(a.priority || "").toLowerCase()] || 0;
        const bw = weight[(b.priority || "").toLowerCase()] || 0;
        return bw - aw; // High -> Low
      }
      const ad = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bd = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sort === "newest" ? bd - ad : ad - bd;
    });
    return list;
  }, [todos, filter, sort]);

  useEffect(() => {
    if (typeof refreshKey !== "undefined") {
      refetch();
    }
  }, [refreshKey, refetch]);

  return (
    <div className="container mx-auto px-6 sm:px-10 py-6">
      <div className="flex items-center justify-between mb-4">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
          <TabsList>
            <TabsTrigger
              className="data-[state=active]:bg-primary-active data-[state=active]:text-primary-foreground"
              value="all"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-primary-active data-[state=active]:text-primary-foreground"
              value="pending"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-primary-active data-[state=active]:text-primary-foreground"
              value="completed"
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Popover open={openForm} onOpenChange={setOpenForm}>
            <PopoverTrigger asChild>
              <Button size="sm" className="bg-primary-active">
                + Add new
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-background">
              <CreateTodoForm
                onCreated={() => {
                  setOpenForm(false);
                  refetch();
                }}
              />
            </PopoverContent>
          </Popover>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="h-10 rounded-md border px-3 text-sm bg-background text-foreground"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority (High→Low)</option>
          </select>
        </div>
      </div>
      {error ? (
        <div className="mb-4 text-sm text-danger">{error.message}</div>
      ) : null}

      <Tabs value={filter}>
        <TabsContent value="all">
          <TodoList todos={visible} loading={loading} onRefresh={refetch} />
        </TabsContent>
        <TabsContent value="pending">
          <TodoList todos={visible} loading={loading} onRefresh={refetch} />
        </TabsContent>
        <TabsContent value="completed">
          <TodoList todos={visible} loading={loading} onRefresh={refetch} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
