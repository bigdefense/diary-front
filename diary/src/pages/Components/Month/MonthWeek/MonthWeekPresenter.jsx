import React from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import MonthDateContainer from '../MonthDate/MonthDateContainer';

/**
 * @param {week} list
 * @returns
 */

const MonthWeekPresenter = ({ week }) => (
  <tbody>
    <tr className="flex">
      {week.map((dayInfo) => <MonthDateContainer dayInfo={dayInfo} key={v4()} />)}
    </tr>
  </tbody>
);

MonthWeekPresenter.propTypes = {
  week: PropTypes.arrayOf(PropTypes.shape({
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
  }).isRequired).isRequired,

};

export default MonthWeekPresenter;
