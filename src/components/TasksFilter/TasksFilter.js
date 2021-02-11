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
    filterOption: PropTypes.string,
  };

  return (
    <ul className="filters">
      <li>
        <button type="button" className={filterOption === 'all' ? 'selected' : null} onClick={() => filterTasks('all')}>
          All
        </button>
      </li>

      <li>
        <button
          type="button"
          className={filterOption === 'active' ? 'selected' : null}
          onClick={() => filterTasks('active')}
        >
          Active
        </button>
      </li>

      <li>
        <button
          type="button"
          className={filterOption === 'completed' ? 'selected' : null}
          onClick={() => filterTasks('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TasksFilter;
