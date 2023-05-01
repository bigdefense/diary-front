/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { BiX } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { INPUT_PLACEHOLDER } from '../../../../../Constants/monthlyConstants';

const MonthInputModalPresenter = ({
  dayInfo,
  inputModalVisible,
  inputModalRef,
  handleInputModalClose,
  onChildDbclick,
  inputText,
  focusRef,
  handleChange,
  handleKeyPress,
}) => (inputModalVisible && dayInfo.locdate ? (
  <div
    onDoubleClick={onChildDbclick}
    ref={inputModalRef}
    className="z-0 absolute inset-x-auto w-96 h-fit bg-white text-right select-none rounded drop-shadow-2xl"
  >
    <div className="flex m-3 justify-end">
      <BiX
        size="25"
        onClick={() => handleInputModalClose()}
        className="rounded cursor-pointer hover:bg-gray-200"
      />
    </div>
    <div className="text-left m-10">
      <form onSubmit={handleKeyPress}>
        <span>■ </span>
        <input
          placeholder={INPUT_PLACEHOLDER}
          value={inputText}
          ref={focusRef}
          onChange={handleChange}
          className="text-xl m-1 pl-2 border-b-2"
        />
      </form>
    </div>
  </div>
) : null);
MonthInputModalPresenter.propTypes = {
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
  inputModalRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  handleInputModalClose: PropTypes.func.isRequired,
  onChildDbclick: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired,
  focusRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};
export default MonthInputModalPresenter;
