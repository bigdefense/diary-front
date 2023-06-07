/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import Image from 'next/image';
import { setDate } from 'src/Redux/action';
import useAxios from 'src/hooks/useAxios';
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
  useEffect(() => {
    dispatch(setDate(offsetDate));
  }, [dispatch, offsetDate]);
  // console.log(dateInDaily, offsetDate);

  const DailyInfo = useSelector(
    (state) => state.dailyReducer.dailyContents[`D-${offsetDate}`],
  );
  const [isSave, setIsSave] = useState(false);
  const [test, setTest] = useState([]);
  const {
    response, error, loading, operation,
  } = useAxios();

  const onClick = () => {
    operation({
      method: 'post',
      url: '/daily/write/',
      data: {
        title: DailyInfo?.titleText,
        content: DailyInfo?.editorContent,
        date: DailyInfo?.locdate,
      },
      withCredentials: true,
    });
  };

  useEffect(() => {
    if (response !== null) {
      setTest(response);
      console.log(test, '?????????????????????');
    }
  }, [response]);

  console.log(response, error, loading);
  // const CheckBtn = async () => {
  //   console.log('-----------------', DailyInfo.titleText, DailyInfo.editorContent);
  //   if (DailyInfo.titleText ||
  // (DailyInfo.editorContent && DailyInfo.editorContent !== '<p></p>')) {
  //     console.log('확인');
  //     setIsSave(true);
  //   } else {
  //     console.log('안돼');
  //   }
  // };

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
          <div
            className={`absolute right-0 w-24 h-24 mr-5 hover:opacity-100 ${isSave ? 'opacity-100' : 'opacity-50'}`}
          >
            <Image
              onClick={onClick}
              src="/Img/bookmark.png"
              width={500}
              height={500}
              alt="bookmark"
              priority
            />
            <div className={`absolute top-0 right-1/2 hover:hidden ${isSave ? 'hidden' : ''}`}>
              <p>s</p>
              <p>a</p>
              <p>v</p>
              <p>e</p>
            </div>
          </div>
          <div className="w-fit p-2 px-5 ml-5 mt-5 border-4 border-gray-200 font-bold text-2xl rounded-full shadow">
            <p>{DAILY_LOGO}</p>
          </div>
          <DailyDisplayContainer setIsSave={setIsSave} />
        </div>
      </div>
      <SideBarContainer />
    </>
  );
};

export default Daily;
