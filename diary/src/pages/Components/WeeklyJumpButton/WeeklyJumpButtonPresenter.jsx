import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { PropTypes } from 'prop-types';
import { v4 } from 'uuid';
import { WEEK } from '../../../Constants/weeklyConstant';

const WeeklyJumpButtonPresenter = ({
  locThisWeek, moveToWeek, maximumWeeks, getWeeksfunc,
}) => (
  <div className="flex justify-end">
    <div className="flex justify-end gap-6 py-2 px-10">
      {maximumWeeks.map((mday, idx) => (
        <button
          onClick={() => getWeeksfunc(mday)}
          className={`${
            locThisWeek.slice(-1) * 1 === idx + 1
              ? 'text-red-500'
              : 'text-black'
          } hover:ring hover:ring-gray-300`}
          type="button"
          key={v4()}
        >
          {WEEK}
          {idx + 1}
        </button>
      ))}
    </div>
    <div className="flex text-3xl px-6 justify-end gap-5 h-10">
      <BiChevronLeft
        onClick={() => moveToWeek(-1)}
        className="cursor-pointer text-gray-700 hover:text-red-700 hover:ring hover:ring-gray-300"
      />
      <BiChevronRight
        onClick={() => moveToWeek(1)}
        className="cursor-pointer text-gray-700 hover:text-red-700 hover:ring hover:ring-gray-300"
      />
    </div>
  </div>
);
WeeklyJumpButtonPresenter.propTypes = {
  locThisWeek: PropTypes.string.isRequired,
  moveToWeek: PropTypes.func.isRequired,
  maximumWeeks: PropTypes.arrayOf(PropTypes.string).isRequired,
  getWeeksfunc: PropTypes.func.isRequired,
};
export default WeeklyJumpButtonPresenter;
