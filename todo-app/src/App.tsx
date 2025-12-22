import { useState, useEffect } from 'react'
import './App.css'
import './themes/minimal.css'
import './themes/compact.css'
import ThemeSwitcher, { type ThemeType } from './ThemeSwitcher'
import type { Todo, FilterType } from './types'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [creatorName, setCreatorName] = useState('')
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
      creator: creatorName.trim() || undefined
    }
    
    setTodos([...todos, newTodo])
    setInputText('')
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

  return (
    <>
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      <div className={`app theme-${theme}`}>
        <h1>Todo App</h1>
      
      <div className="creator-section">
        <label htmlFor="creator-input">登録者名:</label>
        <input
          id="creator-input"
          type="text"
          value={creatorName}
          onChange={(e) => setCreatorName(e.target.value)}
          placeholder="名前を入力（任意）"
        />
      </div>

      <div className="input-section">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいTodoを入力..."
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
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <div className="todo-content">
              <span className="todo-text" onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              {todo.creator && <span className="creator-badge">by {todo.creator}</span>}
            </div>
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
