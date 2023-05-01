/* eslint-disable react/forbid-prop-types */
import React, {
  useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setTodo } from '../../../../../Redux/action';
import MonthInputModalPresenter from './MonthInputModalPresenter';
/**
 *
 * @param {dayInfo} obj 모달이 선택된 날짜 객체 정보
 * @param {inputModalVisible} boolean input modal의 on/off 상태
 * @param {handleInputModalClose} func 모달창을 끄게함
 * @returns
 */

function MonthInputModalContainer({
  dayInfo,
  inputModalVisible,
  handleInputModalClose,
  inputModalRef,
}) {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const focusRef = useRef(null);
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    dispatch(setTodo({ text: inputText, dayInfo }));
    setInputText('');
    handleInputModalClose();
  };

  useEffect(() => {
    if (inputModalVisible) focusRef.current.focus();
  }, [inputModalVisible]);

  const onChildDbclick = (e) => {
    e.stopPropagation();
  };
  return (
    <MonthInputModalPresenter
      dayInfo={dayInfo}
      inputModalVisible={inputModalVisible}
      handleInputModalClose={handleInputModalClose}
      inputModalRef={inputModalRef}
      onChildDbclick={onChildDbclick}
      inputText={inputText}
      focusRef={focusRef}
      handleChange={handleChange}
      handleKeyPress={handleKeyPress}
    />
  );
}

MonthInputModalContainer.propTypes = {
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
  inputModalVisible: PropTypes.bool.isRequired,
  handleInputModalClose: PropTypes.func.isRequired,
  inputModalRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};
export default MonthInputModalContainer;
