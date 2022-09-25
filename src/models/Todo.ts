import { StatusTodo } from "./StatusTodo";

export interface Todo {
  id?: string,
  title: string,
  description: string,
  keywords: string[],
  synced: boolean,
  status: StatusTodo,
  doneAt?: Date,
}

export function isDone(todo: Todo): boolean {
  return todo.status === StatusTodo.Done;
}

export function todoDone(todo: Todo) {
  todo.status = StatusTodo.Done;
  todo.doneAt = new Date();
}

export function todoUnDone(todo: Todo) {
  todo.status = StatusTodo.Todo;
  todo.doneAt = undefined;
}