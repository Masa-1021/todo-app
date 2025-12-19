import { useState, type FormEvent } from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';
import styles from './TodoInput.module.css';

/**
 * TodoInput
 * 新規タスク追加フォーム
 */
export function TodoInput() {
  const [inputValue, setInputValue] = useState('');
  const { addTodo } = useTodoContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 空文字列のバリデーション
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') {
      return;
    }

    // タスクを追加
    addTodo(trimmedValue);
    
    // フォームをクリア
    setInputValue('');
  };

  return (
    <form className={styles.todoInputForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.todoInputField}
        placeholder="新しいタスクを入力..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="新しいタスクを入力"
      />
      <button type="submit" className={styles.todoInputButton} aria-label="タスクを追加">
        追加
      </button>
    </form>
  );
}
