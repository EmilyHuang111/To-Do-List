// Buttons to filter which tasks are shown, plus a "clear completed" button.
// All the data and callbacks come in through props.
const FILTERS = [
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
]

function FilterBar({ filter, onChange, onClearCompleted, hasCompleted }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__group">
        {FILTERS.map((option) => (
          <button
            key={option.key}
            className={
              'filter-bar__button' +
              (filter === option.key ? ' filter-bar__button--active' : '')
            }
            onClick={() => onChange(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button
        className="filter-bar__clear"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </div>
  )
}

export default FilterBar
