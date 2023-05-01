import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setTextContent } from '../../../Redux/action';
import WeeklyDisplayPresenter from './WeeklyDisplayPresenter';
/**
 * @param {idx} number, 배열의 idx (0-7)
 * @param {currlocWeek} str, "2023-03-W3"
 * @param {weekly} obj, 해당 요일의 정보 {day:"", locdate:"", textContent:""}
 * @param {weekTextContent} str 해당 요일의 textContent
 *
 * @returns
 */
const WeeklyDisplayContainer = ({ idx }) => {
  const { currlocWeek } = useSelector(
    (state) => state.weeklyReducer.weeklyContents,
  );
  const weekly = useSelector(
    (state) => state.weeklyReducer.weeklyContents[`W-${currlocWeek}`][idx],
  );
  const dispatch = useDispatch();
  const weekTextContent = useSelector(
    (state) => state.weeklyReducer.weeklyContents[`W-${currlocWeek}`][idx].textContent,
  );

  const handleChange = (e) => {
    dispatch(
      setTextContent({
        content: e.target.value,
        idx,
        locThisWeek: currlocWeek,
      }),
    );
  };

  return (
    <WeeklyDisplayPresenter
      weekly={weekly}
      weekTextContent={weekTextContent}
      handleChange={handleChange}
    />
  );
};

WeeklyDisplayContainer.propTypes = {
  idx: PropTypes.number.isRequired,
};

export default WeeklyDisplayContainer;
