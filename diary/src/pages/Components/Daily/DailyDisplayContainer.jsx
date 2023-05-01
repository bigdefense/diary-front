/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGetDaily from '@/pages/Utils/useGetDaily';
import { setDaily, setTitle } from '@/Redux/action';
import DailyDisplayPresenter from './DailyDisplayPresenter';

/**
 * @param {dailyContents} obj daily 페이지의 정보
 * @param {currentDate} str 현재 선택된 날짜 "0000-00-00"
 * @returns
 */

function DailyDisplayContainer() {
  const dispatch = useDispatch();

  const { currentDate } = useSelector(
    (state) => state.dailyReducer.dailyContents,
  );
  const Daily = useSelector(
    (state) => state.dailyReducer.dailyContents[`D-${currentDate}`],
  );
  const initContent = Daily?.titleText ? Daily.titleText : '';
  const [content, setContent] = useState('');

  const getDaily = useGetDaily(currentDate);
  useEffect(() => {
    if (currentDate) dispatch(setDaily(getDaily));
    setContent(initContent);
  }, [dispatch, getDaily]);

  useEffect(() => {
    dispatch(setTitle({ titleText: content, locdate: currentDate }));
  }, [dispatch, content]);

  const handleInput = (e) => {
    setContent(e.target.value);
  };

  return (
    <DailyDisplayPresenter
      Daily={Daily || {}}
      content={content}
      handleInput={handleInput}
    />
  );
}

export default DailyDisplayContainer;
