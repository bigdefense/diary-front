/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  BiEdit, BiTrash, BiTransfer, BiX,
} from 'react-icons/bi';
import PropTypes from 'prop-types';
import { INPUT_PLACEHOLDER } from '../../../../../Constants/monthlyConstants';

// input Modal의 수정창 === editmodal
function MonthEditModalPresenter({
  todo,
  dayInfo,
  editModalVisible,
  handleEditModalClose,
  editModalRef,
  handleEditKeyPress,
  onDelete,
  setIsEdited,
  isEdited,
  editText,
  focusRef,
  handleEditText,
}) {
  return editModalVisible && dayInfo.locdate ? (
    <div
      onDoubleClick={(e) => e.stopPropagation()}
      ref={editModalRef}
      className="z-0 absolute inset-x-auto w-96 h-fit bg-white text-right select-none rounded drop-shadow-2xl"
    >
      <div className="m-3 flex flex-row-reverse">
        <BiX
          onClick={() => handleEditModalClose()}
          size="25"
          className="rounded cursor-pointer hover:bg-gray-200"
        />
        <BiTransfer
          size="25"
          className="rounded cursor-pointer hover:bg-gray-200"
        />
        <BiTrash
          onClick={() => onDelete(todo)}
          size="25"
          className="rounded cursor-pointer hover:bg-gray-200"
        />
        <BiEdit
          onClick={() => setIsEdited(true)}
          size="25"
          className="rounded cursor-pointer hover:bg-gray-200"
        />
      </div>
      <div className="text-left m-10">
        {isEdited ? (
          <form onSubmit={handleEditKeyPress}>
            <span>■ </span>
            <input
              placeholder={INPUT_PLACEHOLDER}
              value={editText}
              ref={focusRef}
              onChange={handleEditText}
              className="text-xl border-b-2"
            />
          </form>
        ) : (
          <>
            <span>■ </span>
            <span>{todo.todoContent}</span>
          </>
        )}
      </div>
    </div>
  ) : null;
}

MonthEditModalPresenter.propTypes = {
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
  editModalVisible: PropTypes.bool.isRequired,
  handleEditModalClose: PropTypes.func.isRequired,
  editModalRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  handleEditKeyPress: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  setIsEdited: PropTypes.func.isRequired,
  isEdited: PropTypes.bool.isRequired,
  editText: PropTypes.string.isRequired,
  focusRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  handleEditText: PropTypes.func.isRequired,

};
export default MonthEditModalPresenter;
