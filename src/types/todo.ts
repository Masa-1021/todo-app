// Todo型
export interface Todo {
  id: string;              // UUID
  title: string;           // タスクのタイトル
  completed: boolean;      // 完了状態
  createdAt: number;       // 作成日時（Unix timestamp）
  updatedAt: number;       // 更新日時（Unix timestamp）
}

// フィルタ型
export type FilterType = 'all' | 'active' | 'completed';

// State型
export interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

// Action型
export type TodoAction =
  | { type: 'ADD_TODO'; payload: { title: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: FilterType } }
  | { type: 'LOAD_TODOS'; payload: { todos: Todo[] } };
