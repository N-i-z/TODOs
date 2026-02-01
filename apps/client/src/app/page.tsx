"use client";

import TodoListContainer from "@/src/components/organisms/todo-list-container";

export default function Page() {
  return (
    <main className="pb-8 container mx-auto px-6 sm:px-10">
      <h1 className="text-center text-2xl font-bold mb-4">TODOs App</h1>
      <TodoListContainer />
    </main>
  );
}
