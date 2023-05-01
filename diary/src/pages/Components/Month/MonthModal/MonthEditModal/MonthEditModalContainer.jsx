/* eslint-disable react/forbid-prop-types */
import React, {
  useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { delTodo, editTodo } from '../../../../../Redux/action';
import MonthEditModalPresenter from './MonthEditModalPresenter';

/**
 * @param {todo} obj {text, id date}
 * @param {dayInfo} obj
 * @param {itemVisible} boolean
 * @param {handleItemModalClose} func
 * @returns
 */

function MonthEditModalContainer({
  todo,
  dayInfo,
  editModalVisible,
  handleEditModalClose,
  editModalRef,
}) {
  const dispatch = useDispatch();

  const [isEdited, setIsEdited] = useState(false);
  const [editText, setEditText] = useState(todo.todoContent);
  const focusRef = useRef(null);

  const handleEditKeyPress = (e) => {
    e.preventDefault();
    dispatch(editTodo({ text: editText, todo }));
    setIsEdited(false);
  };
  const handleEditText = (e) => {
    setEditText(e.target.value);
  };
  const onDelete = (item) => {
    dispatch(delTodo(item));
  };

  useEffect(() => {
    if (editModalVisible && isEdited) focusRef.current.focus();
  }, [editModalVisible, isEdited]);

  return (
    <MonthEditModalPresenter
      todo={todo}
      dayInfo={dayInfo}
      editModalVisible={editModalVisible}
      handleEditModalClose={handleEditModalClose}
      editModalRef={editModalRef}
      handleEditKeyPress={handleEditKeyPress}
      onDelete={onDelete}
      setIsEdited={setIsEdited}
      isEdited={isEdited}
      editText={editText}
      focusRef={focusRef}
      handleEditText={handleEditText}
    />
  );
}

MonthEditModalContainer.propTypes = {
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
};
export default MonthEditModalContainer;
