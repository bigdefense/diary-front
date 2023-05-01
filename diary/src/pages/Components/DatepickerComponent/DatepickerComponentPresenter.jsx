import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import DatepickerCustomInput from './DatepickerCustomInput';
import 'react-datepicker/dist/react-datepicker.css';
// import { ko } from 'date-fns/esm/locale';

const DatepickerComponentPresenter = ({
  selectedDate, highlightDatesArr, isShow, handleChange, handleClose,
}) => (
  <div className="absolute inset-y-0 left-0">
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      highlightDates={highlightDatesArr}
      show={isShow}
      setShow={handleClose}
      dateFormat="yyyy년 MM월 dd일"
      dateFormatCalendar="yyyy년 MM월"
      customInput={<DatepickerCustomInput />}
    />
  </div>
);
DatepickerComponentPresenter.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  highlightDatesArr: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  isShow: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

DatepickerComponentPresenter.defaultProps = {
  highlightDatesArr: [],
};
export default DatepickerComponentPresenter;
