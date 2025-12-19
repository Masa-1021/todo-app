import { useTodoContext } from '../../hooks/useTodoContext';
import { TodoItem } from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

/**
 * TodoList
 * タスク一覧の表示
 */
export function TodoList() {
  const { filteredTodos } = useTodoContext();

  if (filteredTodos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>タスクがありません</p>
        <p className={styles.emptyHint}>上のフォームから新しいタスクを追加してください</p>
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
