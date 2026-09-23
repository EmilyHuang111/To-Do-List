// A single task row: a checkbox, the task text, and a delete button.
// The whole row is draggable so tasks can be reordered by dragging.
// `todo` is passed in as a prop; clicking calls the functions from props.
function TodoItem({
  todo,
  isDragging,
  onToggle,
  onDelete,
  onDragStart,
  onDragEnd,
  onDragOver,
}) {
  return (
    <li
      className={
        'todo-item' +
        (todo.done ? ' todo-item--done' : '') +
        (isDragging ? ' todo-item--dragging' : '')
      }
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(event) => {
        event.preventDefault() // allow this row to be a drop target
        onDragOver()
      }}
      title="Drag to reorder"
    >
      <span className="todo-item__handle" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-item__text">{todo.text}</span>
      </label>

      <button
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem
