// A single task row: a checkbox, the task text, and a delete button.
// `todo` is passed in as a prop; clicking calls the functions from props.
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={'todo-item' + (todo.done ? ' todo-item--done' : '')}>
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
        ✕
      </button>
    </li>
  )
}

export default TodoItem
