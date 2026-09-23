import TodoItem from './TodoItem.jsx'

// Renders the list of tasks. If there are none to show, it displays
// a friendly empty-state message instead.
function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="todo-list__empty">Nothing here yet. Add a task above! ✨</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
