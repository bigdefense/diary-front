/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { MONTH_SELECTOR_NAME } from './sliceName';

const dateInMonth = new Date();

export const monthSelectorSlice = createSlice({
  name: MONTH_SELECTOR_NAME,
  initialState: {
    yearInMonth: dateInMonth.getFullYear(),
    selectedMonth: dateInMonth.getMonth(),
  },
  reducers: {
    setMonthRouter: (state, { payload: { willMoveMonth, currYear } }) => {
      state.selectedMonth = willMoveMonth;
      state.yearInMonth = currYear;
    },
    setMoveToLastMonth: (state) => {
      if (state.selectedMonth >= 0) {
        state.selectedMonth -= 1;
      }
      if (state.selectedMonth < 0) {
        state.selectedMonth += 12;
        state.yearInMonth -= 1;
      }
    },
    setMoveToNextMonth: (state) => {
      if (state.selectedMonth <= 11) {
        state.selectedMonth += 1;
      }
      if (state.selectedMonth > 11) {
        state.selectedMonth -= 12;
        state.yearInMonth += 1;
      }
    },
  },
});

export const monthSelectorReducer = monthSelectorSlice.reducer;
