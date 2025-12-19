import { useState } from 'react';
import type { Todo } from '../../types/todo';
import { useTodoContext } from '../../hooks/useTodoContext';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

/**
 * TodoItem
 * 個別タスクの表示と操作
 */
export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const { toggleTodo, deleteTodo, updateTodo } = useTodoContext();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue !== '') {
      updateTodo(todo.id, { title: trimmedValue });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        className={styles.todoCheckbox}
        checked={todo.completed}
        onChange={handleToggle}
        aria-label={`${todo.title}を完了`}
      />
      
      {isEditing ? (
        <input
          type="text"
          className={styles.todoEditInput}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
          aria-label="タスクを編集"
        />
      ) : (
        <span 
          className={styles.todoTitle}
          onDoubleClick={handleEdit}
          title="ダブルクリックで編集"
        >
          {todo.title}
        </span>
      )}

      <div className={styles.todoActions}>
        {!isEditing && (
          <>
            <button
              className={styles.editButton}
              onClick={handleEdit}
              aria-label="編集"
            >
              編集
            </button>
            <button
              className={styles.deleteButton}
              onClick={handleDelete}
              aria-label="削除"
            >
              削除
            </button>
          </>
        )}
      </div>
    </div>
  );
}
