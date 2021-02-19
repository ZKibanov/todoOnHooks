import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter';

const Footer = (props) => {
  const { count, clearCompleted, filterTasks, filterOption } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter filterTasks={filterTasks} filterOption={filterOption} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  count: 0,
  filterTasks: () => {},
  clearCompleted: () => {},
  filterOption: 'all',
};

Footer.propTypes = {
  count: PropTypes.number,
  filterTasks: PropTypes.func,
  clearCompleted: PropTypes.func,
  filterOption: PropTypes.objectOf(PropTypes.string),
};

export default Footer;
