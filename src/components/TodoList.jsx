import { useState } from 'react'
import TodoItem from './TodoItem.jsx'

// Renders the list of tasks and handles the drag-to-reorder interaction.
// It remembers which task is currently being dragged, and while that task
// is dragged over another one it asks the parent to reorder them.
function TodoList({ todos, onToggle, onDelete, onReorder }) {
  const [draggingId, setDraggingId] = useState(null)

  if (todos.length === 0) {
    return <p className="todo-list__empty">Nothing here yet. Add a task above!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isDragging={draggingId === todo.id}
          onToggle={onToggle}
          onDelete={onDelete}
          onDragStart={() => setDraggingId(todo.id)}
          onDragEnd={() => setDraggingId(null)}
          onDragOver={() => {
            if (draggingId !== null && draggingId !== todo.id) {
              onReorder(draggingId, todo.id)
            }
          }}
        />
      ))}
    </ul>
  )
}

export default TodoList
