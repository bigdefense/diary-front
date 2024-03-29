import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { WEEK } from 'src/Constants/weeklyConstant';
import WeeklyAxiosNetwork from 'src/network/weekly';
import { setTextContent, setEditable, setIsWriten } from '../../Redux/action';
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
  const weeklyContents = useSelector(
    ({ weeklyReducer }) => weeklyReducer.weeklyContents,
  );
  const { currlocWeek } = weeklyContents;
  const weekly = weeklyContents[WEEK(currlocWeek)][idx];
  const {
    textContent, isEditable, isWriten,
  } = weekly;
  const dispatch = useDispatch();

  const handleChange = (htmlText) => {
    dispatch(
      setTextContent({
        content: htmlText,
        idx,
        locThisWeek: currlocWeek,
      }),
    );
  };

  const onClickWeeklyContentRemove = async () => {
    await WeeklyAxiosNetwork.Delete({
      string_of_week: currlocWeek, number_of_week: idx,
    });
    dispatch(
      setIsWriten({
        idx,
        content: '',
        isWriten: false,
        locThisWeek: currlocWeek,
      }),
    );
  };

  const weeklyContentWrite = async () => {
    console.log(currlocWeek);
    if (isEditable && textContent.trim() !== '' && !isWriten) {
      await WeeklyAxiosNetwork.Write({
        string_of_week: currlocWeek, number_of_week: idx, textContent,
      });
    }
  };

  const weeklyContentUpdate = async () => {
    if (isEditable && isWriten) {
      await WeeklyAxiosNetwork.Update({
        string_of_week: currlocWeek, number_of_week: idx, textContent,
      });
    }
  };

  const setIsEditable = () => {
    weeklyContentWrite();
    weeklyContentUpdate();
    dispatch(
      setEditable({
        idx,
        locThisWeek: currlocWeek,
      }),
    );
  };

  return (
    <WeeklyDisplayPresenter
      isEditable={isEditable}
      onClickWeeklyContentRemove={onClickWeeklyContentRemove}
      setIsEditable={setIsEditable}
      weekly={weekly}
      weekTextContent={textContent}
      handleChange={handleChange}
    />
  );
};

WeeklyDisplayContainer.propTypes = {
  idx: PropTypes.number.isRequired,
};

export default WeeklyDisplayContainer;
