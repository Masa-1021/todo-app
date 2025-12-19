import { useState } from 'react'
import './App.css'
import type { Todo, FilterType } from './types'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

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
    return due < today
  }

  return (
    <div className="app">
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
          <li key={todo.id} className={`${todo.completed ? 'completed' : ''} ${!todo.completed && isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
              {todo.dueDate && (
                <span className="due-date">
                  期限: {new Date(todo.dueDate).toLocaleDateString('ja-JP')}
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
  )
}

export default App
