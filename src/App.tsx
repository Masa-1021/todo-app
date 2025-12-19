import { TodoProvider } from './context/TodoContext';
import { TodoInput } from './components/TodoInput/TodoInput';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import './App.css';

/**
 * App
 * アプリケーション全体の統合
 */
function App() {
  return (
    <TodoProvider>
      <div className="app">
        <header className="app-header">
          <h1>📝 Todo App</h1>
          <p className="app-subtitle">シンプルで使いやすいタスク管理</p>
        </header>
        
        <main className="app-main">
          <TodoInput />
          <TodoFilter />
          <TodoList />
        </main>
        
        <footer className="app-footer">
          <p>© 2025 Todo App</p>
        </footer>
      </div>
    </TodoProvider>
  );
}

export default App;
