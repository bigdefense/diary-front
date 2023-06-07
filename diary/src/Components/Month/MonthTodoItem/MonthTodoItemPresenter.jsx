/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import MonthEditModalContainer from '../MonthModal/MonthEditModal/MonthEditModalContainer';

/**
 * @param {todo} obj {text, date, id}
 * @param {dayInfo} obj {날짜정보, ...}
 * @param {ctrEditModal}
 * { modalVisible: boolean, modalRef:modalRef, handleModalOpen: {f}, handleModalClose: {f} }
 * @returns
 */

const MonthTodoItemPresenter = ({ dayInfo, todo, ctrEditModal }) => (
  <>
    <div
      key={v4()}
      onClick={() => ctrEditModal.handleModalOpen()}
      onKeyDown={ctrEditModal.handleModalOpen}
      role="button"
      tabIndex={0}
      className="block truncate bg-gradient-to-r text-white from-gray-600 from-10% via-gray-400 via-50% to-gray-100 to-80% opacity-100 p-1 pl-2 my-2.5 mx-0.5 rounded hover:text-black hover:from-gray-400 hover:cursor-pointer"
    >
      {todo.todoContent}
    </div>
    <MonthEditModalContainer
      dayInfo={dayInfo}
      todo={todo}
      editModalVisible={ctrEditModal.modalVisible}
      handleEditModalClose={ctrEditModal.handleModalClose}
      editModalRef={ctrEditModal.modalRef}
    />
  </>
);

MonthTodoItemPresenter.propTypes = {
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
  ctrEditModal: PropTypes.shape({
    modalVisible: PropTypes.bool,
    modalRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
    handleModalOpen: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
  }).isRequired,
};

export default MonthTodoItemPresenter;
