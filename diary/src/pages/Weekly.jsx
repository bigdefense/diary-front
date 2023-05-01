/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import DatepickerComponent from './Components/DatepickerComponent/DatepickerComponentContainer';
import useGetWeekly, { getlocWeek } from './Utils/useGetWeekly';
import { setlocWeek, setSelectedWeek, setWeekly } from '../Redux/action';
import { WEEKLY_LOGO } from '../Constants/weeklyConstant';
import WeeklyDisplayContainer from './Components/Weekly/WeeklyDisplayContainer';
import NavBarContainer from './Components/NavBar/NavBarContainer';
import SideBarContainer from './Components/SideBar/SideBarContainer';
import StickerContainer from './Components/Sticker/StickerContainer';
import { CURRENT_ROUTER_PATH } from '../Constants/constants';
import WeeklyJumpButtonContainer from './Components/WeeklyJumpButton/WeeklyJumpButtonContainer';
import useGetDateOffset from './hooks/useGetDateOffset';

/**
 * 모든 날짜를 월요일로 나타내어 관리하기
 * @param {selectedDate} date datepicker에 쓰는 변수
 * @param {selectedDateInWeek} str store에 저장된 현재 날짜 정보 "0000-00-00"
 * @param {currentWeeklyPage, weeklyContents} object, 이 주의 날짜 정보
 * selectedDate가 바뀌면 dispatch함
 * [{"locdate":"", day:"", textContent:""},{}...]
 * @param {locThisWeek} str, 몇째주인지를 나타냄 ex."2023-03-W3"
 * @component <DatepickerComponent/> selectedDate를 달력의 해당 날짜로 바꿈
 */

const WeeklyPage = () => {
  const stickerList = useSelector(
    (state) => state.stickerReducer.stickersArray,
  );
  const currRouter = CURRENT_ROUTER_PATH();

  const { selectedDateInWeek } = useSelector((state) => state.weeklyReducer);
  // datepicker에 필요한 변수 설정
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);

  const dispatch = useDispatch();
  const currentWeeklyPage = useGetWeekly(selectedDateInWeek);
  const locThisWeek = getlocWeek(selectedDateInWeek);
  // 최초 렌더링=> 현재 date 정보 전달 (월요일로 변환 & str로 전달)
  useEffect(() => {
    dispatch(setlocWeek(locThisWeek));
  });
  // 현재 날짜가 바뀌면 해당 날짜의 페이지 정보 띄우기
  useEffect(() => {
    dispatch(setWeekly({ currentWeeklyPage, locWeek: locThisWeek }));
  }, [dispatch, selectedDateInWeek]);
  const offsetDate = useGetDateOffset(selectedDate);
  // datepicker로 인한 날짜 변경 시, selectedDateInWeek를 선택한 date로 변경 (offset+str 변환)
  useEffect(() => {
    dispatch(setSelectedWeek(offsetDate));
  }, [dispatch, selectedDate]);

  const currWeeklyContents = useSelector(
    (state) => state.weeklyReducer.weeklyContents[`W-${locThisWeek}`],
  );

  const weeklyHighlight = useSelector(
    (state) => state.weeklyReducer.weeklyContents,
  );
  const weeklyHighlightArr = Object.keys(weeklyHighlight)
    .filter((key) => key !== 'currlocWeek')
    .map((item) => new Date(weeklyHighlight[item][1].locdate));

  return (
    <>
      <NavBarContainer />
      {stickerList[currRouter]?.map((sticker) => (
        <StickerContainer
          imgURL={sticker.imgURL}
          key={v4()}
          id={sticker.id}
          position={{
            positionX: sticker.positionX,
            positionY: sticker.positionY,
          }}
          width={sticker.width}
          height={sticker.height}
          selected={sticker.selected}
        />
      ))}
      <div className="relative h-full w-full bg-[#9DBC9D] text-center p-10">
        <DatepickerComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          highlightDatesArr={weeklyHighlightArr}
        />
        <div className="bg-white w-fit h-fit border my-10 mx-auto shadow-lg rounded">
          <div className="text-2xl font-bold text-left ml-5">
            <span className="text-black border-4 rounded-full p-2 bg-white">
              {WEEKLY_LOGO}
            </span>
            <span className="text-green-900 p-2">
              {locThisWeek.slice(0, -3)}
            </span>
          </div>
          <WeeklyJumpButtonContainer locThisWeek={locThisWeek} />
          <div className="m-3 mx-5 grid grid-cols-4">
            {currWeeklyContents
              ? currWeeklyContents.map((day, i) => (
                <WeeklyDisplayContainer key={day.id} idx={i} day={day} />
              ))
              : null}
          </div>
        </div>
        <SideBarContainer />
      </div>
    </>
  );
};

export default WeeklyPage;
