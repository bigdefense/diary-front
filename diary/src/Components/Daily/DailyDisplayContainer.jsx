/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGetDaily from 'src/Utils/useGetDaily';
import { setDaily, setTitle } from 'src/Redux/action';
import PropTypes from 'prop-types';
import DailyDisplayPresenter from './DailyDisplayPresenter';
/**
 * @param {dailyContents} obj daily 페이지의 정보
 * @param {currentDate} str 현재 선택된 날짜 "0000-00-00"
 * @returns
 */

function DailyDisplayContainer({ setIsSave }) {
  const dispatch = useDispatch();

  const { currentDate } = useSelector(
    (state) => state.dailyReducer.dailyContents,
  );
  const Daily = useSelector(
    (state) => state.dailyReducer.dailyContents[`D-${currentDate}`],
  );
  // console.log(currentDate, Daily.locdate, Daily.titleText, Daily.editorContent);
  const initContent = Daily?.titleText ? Daily.titleText : '';
  const [content, setContent] = useState('');

  const getDaily = useGetDaily(currentDate);
  useEffect(() => {
    if (currentDate) dispatch(setDaily(getDaily));
    setContent(initContent);
  }, [dispatch, getDaily]);

  useEffect(() => {
    dispatch(setTitle({ titleText: content, locdate: currentDate }));
    setIsSave(false);
  }, [dispatch, currentDate, content]);

  const handleInput = (e) => {
    setContent(e.target.value);
  };

  return (
    <DailyDisplayPresenter
      Daily={Daily || {}}
      content={content}
      handleInput={handleInput}
      setIsSave={setIsSave}
    />
  );
}

DailyDisplayContainer.propTypes = {
  setIsSave: PropTypes.func.isRequired,
};
export default DailyDisplayContainer;
