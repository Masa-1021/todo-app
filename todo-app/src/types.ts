// Type definitions for Todo App
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  creator?: string;
}

export type FilterType = 'all' | 'active' | 'completed';
