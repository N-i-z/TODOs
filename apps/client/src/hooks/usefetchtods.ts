import { useCallback, useEffect, useState } from "react";
import {
  createAPIService,
  formatErrorFromResponse,
} from "../utils/axios.utils";
import { GeneralServerResponse, ServerError } from "../types/api.types";
import { Todo } from "../types/todo.types";

function unwrapResponse<T>(resp: GeneralServerResponse<T> | T): T {
  if (resp && typeof resp === "object" && "success" in (resp as any)) {
    const r = resp as GeneralServerResponse<T>;
    return (r.data as T) ?? (undefined as unknown as T);
  }
  return resp as T;
}

export function useFetchTodos(options?: { enabled?: boolean }) {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ServerError | undefined>();

  const enabled = options?.enabled ?? true;

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);
      const api = createAPIService(true);
      const resp = await api.get<Todo[]>("/todos");
      setData(unwrapResponse<Todo[]>(resp) || []);
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      refetch();
    } else {
      setLoading(false);
    }
  }, [enabled, refetch]);

  return { data, loading, error, refetch };
}

export function useFetchTodoById(id?: number, options?: { enabled?: boolean }) {
  const [data, setData] = useState<Todo | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ServerError | undefined>();

  const enabled = (options?.enabled ?? true) && !!id;

  const refetch = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(undefined);
      const api = createAPIService(true);
      const resp = await api.get<Todo>(`/todos/${id}`);
      setData(unwrapResponse<Todo>(resp));
    } catch (err: any) {
      setError(formatErrorFromResponse(err));
      setData(undefined);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (enabled) {
      refetch();
    } else {
      setLoading(false);
    }
  }, [enabled, refetch]);

  return { data, loading, error, refetch };
}
