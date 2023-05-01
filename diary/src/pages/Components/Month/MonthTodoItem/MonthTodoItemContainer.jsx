import React from 'react';
import PropTypes from 'prop-types';
import useControlModal from '../../../hooks/useControlModal';
import MonthTodoItemPresenter from './MonthTodoItemPresenter';

/**
 * @param {todo} obj {text, date, id}
 * @param {dayInfo} obj {날짜정보, ...}
 * @param {ctrEditModal}
 * { modalVisible: boolean, modalRef:modalRef, handleModalOpen: {f}, handleModalClose: {f} }
 * @returns
 */

const MonthTodoItemContainer = ({ todo, dayInfo }) => {
  const ctrEditModal = useControlModal(dayInfo.isInMonth);
  return (
    <MonthTodoItemPresenter
      dayInfo={dayInfo}
      todo={todo}
      ctrEditModal={ctrEditModal}
    />
  );
};

MonthTodoItemContainer.propTypes = {
  dayInfo: PropTypes.shape({
    date: PropTypes.number.isRequired,
    dateName: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    isHoliday: PropTypes.bool.isRequired,
    isInMonth: PropTypes.bool.isRequired,
    locdate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      todoContent: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  todo: PropTypes.shape({
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    todoContent: PropTypes.string.isRequired,
  }).isRequired,
};
export default MonthTodoItemContainer;
