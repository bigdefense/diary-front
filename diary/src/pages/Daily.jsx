/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { setDate } from 'src/Redux/action';
import useAxios from 'src/hooks/useAxios';
import DailyTopMark from 'src/Components/DailyTopMark/DailyTopMark';
import DailyDisplayContainer from '../Components/Daily/DailyDisplayContainer';
import DatepickerComponentContainer from '../Components/DatepickerComponent/DatepickerComponentContainer';
import { DAILY_LOGO } from '../Constants/dailyConstant';
import NavBarContainer from '../Components/NavBar/NavBarContainer';
import SideBarContainer from '../Components/SideBar/SideBarContainer';
import StickerContainer from '../Components/Sticker/StickerContainer';
import { CURRENT_ROUTER_PATH } from '../Constants/constants';
import useGetDateOffset from '../hooks/useGetDateOffset';
/**
 *
 * @param {selectedDate} date
 * @returns {string} 2021-08-01
 */

const Daily = () => {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);
  // 기본 설정은 현재 날짜, 달력 선택한 날짜
  const dateInDaily = selectedDate;
  const stickerList = useSelector(
    (state) => state.stickerReducer.stickersArray,
  );
  const dailyHighlight = useSelector(
    (state) => state.dailyReducer.dailyContents,
  );
  const dailyHighlightArr = Object.keys(dailyHighlight)
    .filter((key) => key !== 'currentDate')
    .map((item) => new Date(dailyHighlight[item].locdate));
  const currRouter = CURRENT_ROUTER_PATH();
  const dispatch = useDispatch();
  // date() 객체는 redux action 객체로 불러올 수 없음. 간단한 날짜 형식으로 바꿔 넣어주기
  // 날짜가 바뀌면 페이지를 다시 불러옴
  const offsetDate = useGetDateOffset(dateInDaily);

  const [isSave, setIsSave] = useState(false);

  const {
    response, error, loading, operation,
  } = useAxios();

  const getReadDailyAxios = () => {
    operation({
      method: 'get',
      url: `/daily/read/${offsetDate}`,
    });
  };

  // 현재 날짜 정보 store에 저장
  useEffect(() => {
    dispatch(setDate(offsetDate));
    getReadDailyAxios();
  }, [dispatch, offsetDate]);

  // result :{id:1, user_id:2, title:'1', content:'', date:'2023-05-12',}
  // createAt, updateAt / title, content
  // console.log('getread', response, error, loading);
  const axiosCode = response?.code || '';
  const resTitle = response?.result?.title || '';
  const resContent = response?.result?.content || '';
  // console.log(axiosCode, resContent, resTitle);
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
      <div className="h-full w-full p-5 bg-[#E5C7AF] ">
        <DatepickerComponentContainer
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          highlightDatesArr={dailyHighlightArr}
        />
        <div className="relative bg-zinc-50 w-fit h-fit border pb-5 my-10 mx-auto shadow-lg rounded">
          <DailyTopMark isSave={isSave} setIsSave={setIsSave} axiosCode={axiosCode} />
          <div className="w-fit p-2 px-5 ml-5 mt-5 border-4 border-gray-200 font-bold text-2xl rounded-full shadow">
            <p>{DAILY_LOGO}</p>
          </div>
          <DailyDisplayContainer
            setIsSave={setIsSave}
            resTitle={resTitle}
            resContent={resContent}
          />
        </div>
      </div>
      <SideBarContainer />
    </>
  );
};

export default Daily;
