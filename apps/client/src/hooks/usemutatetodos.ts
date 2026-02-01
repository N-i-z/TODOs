import { useState } from "react";
import {
  createAPIService,
  formatErrorFromResponse,
} from "../utils/axios.utils";
import { GeneralServerResponse, ServerError } from "../types/api.types";
import { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo.types";

function unwrapResponse<T>(resp: GeneralServerResponse<T> | T): T {
  if (resp && typeof resp === "object" && "success" in (resp as any)) {
    const r = resp as GeneralServerResponse<T>;
    return (r.data as T) ?? (undefined as unknown as T);
  }
  return resp as T;
}

export function useMutateTodos() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ServerError | undefined>();

  const api = createAPIService(true);

  const createTodo = async (
    input: CreateTodoInput,
  ): Promise<Todo | undefined> => {
    try {
      setLoading(true);
      setError(undefined);
      const resp = await api.post<Todo>("/todos", input);
      return unwrapResponse<Todo>(resp);
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (
    id: number,
    input: UpdateTodoInput,
  ): Promise<Todo | undefined> => {
    try {
      setLoading(true);
      setError(undefined);
      const resp = await api.patch<Todo>(`/todos/${id}`, input);
      return unwrapResponse<Todo>(resp);
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
    } finally {
      setLoading(false);
    }
  };

  const markDone = async (id: number): Promise<Todo | undefined> => {
    try {
      setLoading(true);
      setError(undefined);
      const resp = await api.patch<Todo>(`/todos/${id}/done`, {});
      return unwrapResponse<Todo>(resp);
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
    } finally {
      setLoading(false);
    }
  };

  const markUndone = async (id: number): Promise<Todo | undefined> => {
    try {
      setLoading(true);
      setError(undefined);
      const resp = await api.patch<Todo>(`/todos/${id}/undone`, {});
      return unwrapResponse<Todo>(resp);
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
    } finally {
      setLoading(false);
    }
  };

  const softDelete = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(undefined);
      await api.delete<void>(`/todos/${id}`);
      return true;
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const hardDelete = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(undefined);
      await api.delete<void>(`/todos/${id}/hard`);
      return true;
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const restore = async (id: number): Promise<Todo | undefined> => {
    try {
      setLoading(true);
      setError(undefined);
      const resp = await api.patch<Todo>(`/todos/${id}/restore`, {});
      return unwrapResponse<Todo>(resp);
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createTodo,
    updateTodo,
    markDone,
    markUndone,
    softDelete,
    hardDelete,
    restore,
  };
}
