import { useContext } from 'react';
import { TodoContext, type TodoContextValue } from '../context/TodoContext';

/**
 * useTodoContext
 * TodoContextへのアクセスを提供するカスタムフック
 */
export function useTodoContext(): TodoContextValue {
  const context = useContext(TodoContext);
  
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  
  return context;
}
