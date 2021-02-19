import React from 'react';
import PropTypes from 'prop-types';

const TasksFilter = (props) => {
  const { filterTasks, filterOption } = props;

  TasksFilter.defaultProps = {
    filterTasks: () => {},
    filterOption: 'all',
  };

  TasksFilter.propTypes = {
    filterTasks: PropTypes.func,
    filterOption: PropTypes.objectOf(PropTypes.string),
  };

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filterOption.filter === 'all' ? 'selected' : null}
          onClick={() => filterTasks('all')}
        >
          All
        </button>
      </li>

      <li>
        <button
          type="button"
          className={filterOption.filter === 'active' ? 'selected' : null}
          onClick={() => filterTasks('active')}
        >
          Active
        </button>
      </li>

      <li>
        <button
          type="button"
          className={filterOption.filter === 'completed' ? 'selected' : null}
          onClick={() => filterTasks('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TasksFilter;
