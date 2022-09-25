export interface Todo {
  id?: string,
  title: string,
  description: string,
  keywords: string[],
  synced: boolean,
  done: boolean,
  doneAt?: Date,
  isArchived: boolean,
}

export function isDone(todo: Todo): boolean {
  return todo.done;
}

export function todoDone(todo: Todo, count: void) {
  todo.done = true;
  todo.doneAt = new Date();
}

export function todoUnDone(todo: Todo, count: void) {
  todo.done = false;
  todo.doneAt = undefined;
}