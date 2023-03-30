import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import { v4 } from "uuid";
import { setCal } from "@/Redux/action";
import MonthWeekPresenter from "./Components/Month/MonthWeek/MonthWeekPresenter";
import useMonthCalendar from "./Utils/useMonthCalendar";
import {
  DAY_OF_WEEK,
  MONTH_LIST,
  MONTH_INDICATING,
} from "../Constants/monthlyConstants";
import NavBarContainer from "./Components/NavBar/NavBarContainer";
import StickerContainer from "./Components/Sticker/StickerContainer";
import SideBarContainer from "./Components/SideBar/SideBarContainer";
import { CURRENT_ROUTER_PATH } from "@/Constants/constants";

/**
 * @param {selectedMonth} number, 기본 날짜는 현재 월 (0-11)
 * @returns
 */

function MonthlyPage() {
  const dateInMonth = new Date();
  const [yearInMonth, setYearInMonth] = useState(dateInMonth.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(dateInMonth.getMonth());

  const stickerList = useSelector(
    (state) => state.stickerReducer.stickersArray
  );
  const currRouter = CURRENT_ROUTER_PATH();
  const dispatch = useDispatch();
  const { monthCalendar } = useSelector((state) => state.monthCalendarReducer);

  useEffect(() => {
    dispatch(setCal(useMonthCalendar(yearInMonth, MONTH_LIST[selectedMonth])));
  }, [selectedMonth]);

  const moveToLastMonth = () => {
    if (selectedMonth > 0) setSelectedMonth(selectedMonth - 1);
    else {
      setSelectedMonth(selectedMonth + 11);
      setYearInMonth(yearInMonth - 1);
    }
  };
  const moveToNextMonth = () => {
    if (selectedMonth < 11) setSelectedMonth(selectedMonth + 1);
    else {
      setSelectedMonth(selectedMonth - 11);
      setYearInMonth(yearInMonth + 1);
    }
  };

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
    <div className="flex justify-center p-10 h-full w-full bg-gray-100">
      <div className="bg-zinc-50 border p-2 my-10 h-fit shadow-lg rounded">
        <div className="flex gap-5">
          <div className="text-3xl w-min px-6 my-auto">
              <BiCaretUp
                onClick={() => moveToNextMonth()}
                className="cursor-pointer text-gray-700 hover:text-red-700 hover:ring hover:ring-gray-300"
              />
              <BiCaretDown
                onClick={() => moveToLastMonth()}
                className="cursor-pointer text-gray-700 hover:text-red-700 hover:ring hover:ring-gray-300"
              />
            </div>
            <p className="text-5xl w-fit px-6 m-3 text-gray-700 select-none">
              {selectedMonth + 1}
              {MONTH_INDICATING}
            </p>
            <p className="text-2xl text-green-900 select-none">{yearInMonth}</p>
          </div>
          <div className="flex my-2 border-2">
            {DAY_OF_WEEK.map((day) => (
              <div
                className={`flex border w-36 text-lg font-bold justify-center bg-gray-200 ${
                  day === "Sun" ? "text-[#FF0000]" : ""
                }`}
                key={v4()}
              >
                {day[0]}
              </div>
            ))}
          </div>
          <table className="border-collapse border border-gray-400">
            {monthCalendar.length
              ? monthCalendar.map((week) => (
                  <MonthWeekPresenter key={v4()} week={week} />
                ))
              : null}
          </table>
        </div>
        <SideBarContainer />
      </div>
    </>
  );
}

export default MonthlyPage;
