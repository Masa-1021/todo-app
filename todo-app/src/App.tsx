import { useState, useEffect } from 'react'
import './App.css'
import './themes/minimal.css'
import './themes/compact.css'
import ThemeSwitcher, { type ThemeType } from './ThemeSwitcher'
import type { Todo, FilterType } from './types'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('todo-app-theme')
    const validThemes: ThemeType[] = ['modern', 'minimal', 'compact']
    return validThemes.includes(savedTheme as ThemeType) 
      ? (savedTheme as ThemeType) 
      : 'modern'
  })

  useEffect(() => {
    localStorage.setItem('todo-app-theme', theme)
  }, [theme])

  const addTodo = () => {
    if (inputText.trim() === '') return
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false,
      dueDate: dueDate || undefined
    }
    
    setTodos([...todos, newTodo])
    setInputText('')
    setDueDate('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeTodoCount = todos.filter(todo => !todo.completed).length

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(dueDate)
    return !isNaN(due.getTime()) && due < today
  }

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate)
    if (isNaN(date.getTime())) return dueDate
    return date.toLocaleDateString('ja-JP')
  }

  const getTodoClassName = (todo: Todo) => {
    const classes = []
    if (todo.completed) classes.push('completed')
    if (!todo.completed && isOverdue(todo.dueDate)) classes.push('overdue')
    return classes.join(' ')
  }

  return (
    <>
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      <div className={`app theme-${theme}`}>
        <h1>Todo App</h1>
      
      <div className="input-section">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいTodoを入力..."
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        <button onClick={addTodo}>追加</button>
      </div>

      <div className="filter-section">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          すべて
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          アクティブ
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          完了済み
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={getTodoClassName(todo)}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
              {todo.dueDate && (
                <span className="due-date">
                  期限: {formatDueDate(todo.dueDate)}
                </span>
              )}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="footer">
          残り: {activeTodoCount}件
        </div>
      )}
      </div>
    </>
  )
}

export default App
