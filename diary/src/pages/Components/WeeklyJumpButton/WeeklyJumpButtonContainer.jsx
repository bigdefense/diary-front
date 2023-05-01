import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setMoveToWeek, setSelectedWeek } from '../../../Redux/action';
import useGetWeeksTarget from '../../Utils/useGetWeeksTarget';
import WeeklyJumpButtonPresenter from './WeeklyJumpButtonPresenter';
/**
 * 모든 날짜를 월요일로 나타내어 관리하기
 * ++ weekly 페이지에서 주 단위로 이동 가능하게
 * @param {selectedDateInWeek} str store에 저장된 현재 날짜 정보
 * @param {locThisWeek} str, 몇째주인지를 나타냄 ex."2023-03-W3"
 * @param {moveToWeek} func, selectedDateInWeek를 저번달, 다음달로 바꿈
 * @param {maximumWeeks} list, ex. [3,10,17,24] 해당 달의 월요일 날짜 모음
 */

const WeeklyJumpButtonContainer = ({ locThisWeek }) => {
  const { selectedDateInWeek } = useSelector((state) => state.weeklyReducer);
  const dispatch = useDispatch();

  const moveToWeek = (nextWeek) => {
    dispatch(setMoveToWeek(nextWeek));
  };

  const maximumWeeks = useGetWeeksTarget(selectedDateInWeek);

  const getWeeksfunc = (mday) => {
    dispatch(setSelectedWeek(mday));
  };

  return (
    <WeeklyJumpButtonPresenter
      locThisWeek={locThisWeek}
      moveToWeek={moveToWeek}
      maximumWeeks={maximumWeeks}
      getWeeksfunc={getWeeksfunc}
      selectedDateInWeek={selectedDateInWeek}
    />
  );
};
WeeklyJumpButtonContainer.propTypes = {
  locThisWeek: PropTypes.string.isRequired,
};

export default WeeklyJumpButtonContainer;
