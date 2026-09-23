import { useState, useEffect } from 'react'
import AddTodo from './components/AddTodo.jsx'
import FilterBar from './components/FilterBar.jsx'
import TodoList from './components/TodoList.jsx'
import './App.css'

const STORAGE_KEY = 'my-todo-list'

// A few starter tasks, only used the very first time the app runs
// (before anything has been saved to the browser).
const DEFAULT_TODOS = [
  { id: 1, text: 'Read the Full Stack @ Brown application', done: true },
  { id: 2, text: 'Build a to-do list in React', done: false },
  { id: 3, text: 'Write the README', done: false },
]

function App() {
  // ---- State ----
  // The list of todos. We initialize it from localStorage so tasks
  // survive a page refresh; if nothing is saved yet, use the defaults.
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : DEFAULT_TODOS
  })

  // Which tasks to show: 'active' | 'done'
  const [filter, setFilter] = useState('active')

  // Whenever the todos change, save them to the browser.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // ---- Actions (these update state, which re-renders the UI) ----
  function addTodo(text) {
    const newTodo = {
      id: Date.now(), // simple unique id
      text,
      done: false,
    }
    setTodos([newTodo, ...todos])
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.done))
  }

  // Move the dragged task (dragId) to the position of the task it's
  // hovering over (hoverId), so the list reorders as you drag.
  function moveTodo(dragId, hoverId) {
    setTodos((prev) => {
      const items = [...prev]
      const from = items.findIndex((todo) => todo.id === dragId)
      const to = items.findIndex((todo) => todo.id === hoverId)
      if (from === -1 || to === -1 || from === to) return prev
      const [moved] = items.splice(from, 1) // remove the dragged task
      items.splice(to, 0, moved) // insert it at the new spot
      return items
    })
  }

  // ---- Derived values ----
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'done') return todo.done
    return !todo.done // 'active'
  })

  const activeCount = todos.filter((todo) => !todo.done).length

  return (
    <div className="app">
      <header className="app__header">
        <h1>My To-Do List</h1>
        <p className="app__subtitle">
          {activeCount === 0
            ? 'All done nice work!'
            : `${activeCount} task${activeCount === 1 ? '' : 's'} left to do`}
        </p>
      </header>

      <AddTodo onAdd={addTodo} />

      <FilterBar
        filter={filter}
        onChange={setFilter}
        onClearCompleted={clearCompleted}
        hasCompleted={todos.some((todo) => todo.done)}
      />

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onReorder={moveTodo}
      />
    </div>
  )
}

export default App
