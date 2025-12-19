import type { FilterType } from '../../types/todo';
import { useTodoContext } from '../../hooks/useTodoContext';
import styles from './TodoFilter.module.css';

/**
 * TodoFilter
 * フィルタボタンの表示と切り替え
 */
export function TodoFilter() {
  const { filter, setFilter } = useTodoContext();

  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'すべて' },
    { type: 'active', label: '未完了' },
    { type: 'completed', label: '完了済み' },
  ];

  return (
    <div className={styles.todoFilter}>
      {filters.map((f) => (
        <button
          key={f.type}
          className={`${styles.filterButton} ${filter === f.type ? styles.active : ''}`}
          onClick={() => setFilter(f.type)}
          aria-label={`${f.label}を表示`}
          aria-pressed={filter === f.type}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
