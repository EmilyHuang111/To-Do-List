import { useState } from 'react'

// A small form for adding a new task.
// It receives an `onAdd` function via props and calls it when submitted.
function AddTodo({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault() // stop the page from reloading
    const trimmed = text.trim()
    if (trimmed === '') return // ignore empty input
    onAdd(trimmed)
    setText('') // clear the input for the next task
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        className="add-todo__input"
        type="text"
        value={text}
        placeholder="Add a new task…"
        onChange={(event) => setText(event.target.value)}
        aria-label="New task"
      />
      <button className="add-todo__button" type="submit">
        Add
      </button>
    </form>
  )
}

export default AddTodo
