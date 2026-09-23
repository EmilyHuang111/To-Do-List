# My To-Do List

A small, single-page to-do list built with **React** (using Vite). You can add
tasks, mark them complete, delete them, drag to reorder them, and filter the
list. Your tasks are saved in the browser, so they're still there when you
refresh the page.

> Built for the **Full Stack at Brown** Developer Application (Option 2: build a
> new React page).

## Overview

This app lets you manage a personal task list:

- **Add** a task by typing and pressing *Add* (or Enter).
- **Complete** a task by checking its box — completed tasks get a strikethrough.
- **Delete** a task with the *Delete* button.
- **Reorder** tasks by dragging a row up or down into the order you want.
- **Filter** the list between *Active* and *Done* tasks.
- **Clear completed** removes every finished task at once.
- A **counter** in the header shows how many tasks are left.
- Everything **persists** to `localStorage`, so refreshing keeps your list.

## How to run it

You'll need [Node.js](https://nodejs.org/) (v18 or newer) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open the URL Vite prints in your terminal (usually
**http://localhost:5173**).

To build a production version, run `npm run build` and preview it with
`npm run preview`.

## My contribution

I built this page from scratch. The main pieces I wrote:

- **Component structure.** I split the UI into small, reusable components that
  pass data through props:
  - `App` — holds the state (the task list + current filter) and the functions
    that change it.
  - `AddTodo` — the input form; calls `onAdd` when you submit.
  - `FilterBar` — the Active / Done buttons and *Clear completed*.
  - `TodoList` — maps over the tasks, tracks which one is being dragged, and
    shows an empty-state message.
  - `TodoItem` — a single draggable task row (grip, checkbox, text, delete).
- **State and interactions.** `App` uses `useState` for the todos and the
  filter. Adding, toggling, deleting, clearing, and reordering all update state
  immutably (with `map`/`filter`/`splice` on a copy), which re-renders the
  interface.
- **Drag to reorder.** Each row is a native draggable element. While a row is
  dragged over another, `App`'s `moveTodo` splices it into the new position, so
  the list rearranges live and the new order is saved.
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
`localStorage` every time the tasks change, which is what makes the list survive
a refresh.

Adding **drag-to-reorder** was the other challenge. I used the browser's built-in
drag events instead of a library, and the key realization was to keep *one*
piece of state for "which task is being dragged," then reorder the array as that
task is dragged over another row. Because the reorder happens on the shared
`todos` array in `App`, the same immutable-update pattern (and `localStorage`
saving) that powers everything else just worked for the new order too.

## References

- [React official docs — Quick Start](https://react.dev/learn) (components,
  props, `useState`, `useEffect`).
- [Vite — Getting Started](https://vite.dev/guide/) for the project setup and
  dev server.
- Full Stack at Brown bootcamp materials, for the core React techniques.

## Project structure

```
├── index.html            # HTML entry point
├── package.json          # scripts and dependencies
├── vite.config.js        # Vite + React plugin config
├── public/
│   └── todo.svg          # favicon
└── src/
    ├── main.jsx          # renders <App> into the page
    ├── App.jsx           # state + main layout
    ├── App.css
    ├── index.css
    └── components/
        ├── AddTodo.jsx
        ├── FilterBar.jsx
        ├── TodoList.jsx
        └── TodoItem.jsx
```
