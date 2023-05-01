/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getMonday } from '../pages/Utils/useGetWeekly';

/**
 * {setWeekly} Weekly의 모든 것
 * {setlocWeek} 현재 날짜
 * {setlectedDateInWeek} 그 주의 월요일
 * {setTextContent} 텍스트
 */
const calNAME = 'weeklyPlanner';
export const weeklySlice = createSlice({
  name: calNAME,
  initialState: {
    selectedDateInWeek: getMonday(new Date(), 1).toISOString().substring(0, 10),
    weeklyContents: {},
  },
  reducers: {
    setWeekly: (
      { weeklyContents },
      { payload: { locWeek, currentWeeklyPage } },
    ) => {
      if (!weeklyContents[`W-${locWeek}`]) {
        weeklyContents[`W-${locWeek}`] = currentWeeklyPage;
      }
    },
    setlocWeek: ({ weeklyContents }, { payload }) => {
      weeklyContents.currlocWeek = payload;
    },
    setSelectedWeek: (state, { payload }) => {
      state.selectedDateInWeek = payload;
    },
    setTextContent: (
      { weeklyContents },
      { payload: { idx, content, locThisWeek } },
    ) => {
      weeklyContents[`W-${locThisWeek}`][idx].textContent = content;
    },
    setMoveToWeek: (state, { payload: nextWeek }) => {
      const currDate = state.selectedDateInWeek;
      const dateConv = new Date(currDate);
      const dateCalculation = new Date(
        dateConv.getFullYear(),
        dateConv.getMonth() + nextWeek,
        dateConv.getDate(),
      );
      const dateConvStr = getMonday(dateCalculation, 1)
        .toISOString()
        .substring(0, 10);
      state.selectedDateInWeek = dateConvStr;
    },

  },
});

export const weeklyReducer = weeklySlice.reducer;
