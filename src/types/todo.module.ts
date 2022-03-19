export interface TodoType {
  id: string;
  text: string;
  todoStatus: TodoStatus;
}

export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'FINISHED';
