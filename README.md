# My To-Do List

A small, single-page to-do list built with **React** (using Vite). You can add
tasks, mark them complete, delete them, and filter the list. Your tasks are
saved in the browser, so they're still there when you refresh the page.


## Overview

This app lets you manage a personal task list:

- **Add** a task by typing and pressing *Add* (or Enter).
- **Complete** a task by checking its box. Completed tasks get a strikethrough.
- **Delete** a task with the ✕ button.
- **Filter** the list by *Active*, or *Done*.
- **Clear completed** removes every finished task at once.
- A **counter** in the header shows how many tasks are left.
- Everything **persists** to `localStorage`, so refreshing keeps your list.

## How to run it

You'll need [Node.js](https://nodejs.org/) (v18 or newer) installed.

```bash
# 1. Move to Correct Directory
cd To-Do-List

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the URL Vite prints in your terminal (usually
**http://localhost:5173**).


## My contribution

I built this page from scratch. The main pieces I wrote:

- **Component structure.** I split the UI into small, reusable components that
  pass data through props:
  - `App` — holds the state (the task list + current filter) and the functions
    that change it.
  - `AddTodo` — the input form; calls `onAdd` when you submit.
  - `FilterBar` — the Active / Done buttons and *Clear completed*.
  - `TodoList` — maps over the tasks and shows an empty-state message.
  - `TodoItem` — a single task row (checkbox, text, delete button).
- **State and interactions.** `App` uses `useState` for the todos and the
  filter. Adding, toggling, deleting, and clearing all update state
  immutably (with `map`/`filter`), which re-renders the interface.
- **Persistence.** A `useEffect` saves the todos to `localStorage` whenever they
  change, and the initial state is read back from `localStorage` on load.
- **Styling.** All the CSS in `App.css` / `index.css`, including a light/dark
  theme that follows the system setting.

## What I learned

The trickiest part was making sure updating one task didn't accidentally change
the others. My first instinct was to edit the task object directly, but that
mutates React's state and the UI didn't update reliably. I learned to update
state **immutably** instead — returning a brand-new array with `map` and using
the spread operator (`{ ...todo, done: !todo.done }`) to copy a task while
flipping just one field. That made toggling and deleting predictable, and it's
why the `key={todo.id}` on each list item matters for React to track rows.

I also learned how `useEffect` works by using it to sync the list to
`localStorage` every time the tasks change, which is what keeps the list after a refresh.


## References

- [React official docs — Quick Start](https://react.dev/learn) (components,
  props, `useState`, `useEffect`).
- [Vite — Getting Started](https://vite.dev/guide/) for the project setup and
  dev server.
- Full Stack at Brown bootcamp materials
