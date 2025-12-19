import { createContext, useReducer, useEffect, useMemo, useRef, type ReactNode } from 'react';
import type { Todo, FilterType, TodoState } from '../types/todo';
import { todoReducer } from './todoReducer';
import { StorageService } from '../services/StorageService';

const STORAGE_KEY = 'todos-app-data';

// Context Value型定義
export interface TodoContextValue {
  todos: Todo[];
  filter: FilterType;
  addTodo: (title: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  filteredTodos: Todo[];
}

// Context作成
// eslint-disable-next-line react-refresh/only-export-components
export const TodoContext = createContext<TodoContextValue | undefined>(undefined);

// 初期状態
const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

// フィルタリング関数
function getFilteredTodos(todos: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'all':
    default:
      return todos;
  }
}

// Provider Props
interface TodoProviderProps {
  children: ReactNode;
}

/**
 * TodoProvider
 * 全てのTodo操作と状態を一元管理
 */
export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const isInitializedRef = useRef(false);

  // 初期表示時にlocalStorageからデータを読み込む
  useEffect(() => {
    const savedData = StorageService.load<{ todos: Todo[] }>(STORAGE_KEY);
    if (savedData && savedData.todos) {
      dispatch({ type: 'LOAD_TODOS', payload: { todos: savedData.todos } });
    }
    isInitializedRef.current = true;
  }, []);

  // todosが変更されたらlocalStorageに保存（初期化後のみ）
  useEffect(() => {
    if (isInitializedRef.current) {
      StorageService.save(STORAGE_KEY, { todos: state.todos });
    }
  }, [state.todos]);

  // フィルタリングされたTodos（メモ化）
  const filteredTodos = useMemo(
    () => getFilteredTodos(state.todos, state.filter),
    [state.todos, state.filter]
  );

  // Context値（メモ化）
  const value = useMemo<TodoContextValue>(
    () => ({
      todos: state.todos,
      filter: state.filter,
      addTodo: (title: string) => {
        dispatch({ type: 'ADD_TODO', payload: { title } });
      },
      updateTodo: (id: string, updates: Partial<Todo>) => {
        dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
      },
      deleteTodo: (id: string) => {
        dispatch({ type: 'DELETE_TODO', payload: { id } });
      },
      toggleTodo: (id: string) => {
        dispatch({ type: 'TOGGLE_TODO', payload: { id } });
      },
      setFilter: (filter: FilterType) => {
        dispatch({ type: 'SET_FILTER', payload: { filter } });
      },
      filteredTodos,
    }),
    [state.todos, state.filter, filteredTodos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
