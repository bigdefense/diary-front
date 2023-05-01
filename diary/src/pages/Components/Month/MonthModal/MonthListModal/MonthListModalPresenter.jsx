/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { v4 } from 'uuid';
import { BiX } from 'react-icons/bi';
import PropTypes from 'prop-types';
import MonthTodoItemContainer from '../../MonthTodoItem/MonthTodoItemContainer';

const MonthListModalPresenter = ({
  dayInfo,
  listModalVisible,
  handleListModalClose,
  listModalRef,
}) => {
  const { locdate, todos, day } = dayInfo;

  return listModalVisible ? (
    <div
      onDoubleClick={(e) => e.stopPropagation()}
      ref={listModalRef}
      className="z-1 w-96 h-96 p-1 bg-white text-right rounded drop-shadow-2xl select-none"
    >
      <div className="flex m-3 justify-end">
        <BiX
          onClick={() => handleListModalClose()}
          size="25"
          className="rounded cursor-pointer hover:bg-gray-200"
        />
      </div>
      <div className="text-left px-3">
        <p className="text-lg text-center text-green-900 border-2">
          {locdate}
          {' '}
          {day}
        </p>
        <div className="p-1 border max-h-72 overflow-y-scroll">
          {todos.map((todo) => (
            <MonthTodoItemContainer key={v4()} todo={todo} dayInfo={dayInfo} />
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

MonthListModalPresenter.propTypes = {
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
  listModalVisible: PropTypes.bool.isRequired,
  handleListModalClose: PropTypes.func.isRequired,
  listModalRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};
export default MonthListModalPresenter;
