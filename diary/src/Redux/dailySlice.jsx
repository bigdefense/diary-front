/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const calNAME = 'editorContent';

export const dailySlice = createSlice({
  name: calNAME,
  initialState: {
    dailyContents: {},
  },
  reducers: {
    setDaily: ({ dailyContents }, { payload, payload: { locdate } }) => {
      if (!dailyContents[`D-${locdate}`]) {
        dailyContents[`D-${locdate}`] = payload;
      }
    },
    setDate: ({ dailyContents }, { payload }) => {
      dailyContents.currentDate = payload;
    },
    setEditor: ({ dailyContents }, { payload: { locdate, html } }) => {
      dailyContents[`D-${locdate}`].editorContent = html;
    },
    setTitle: ({ dailyContents }, { payload: { locdate, titleText } }) => {
      if (dailyContents[`D-${locdate}`]) {
        dailyContents[`D-${locdate}`].titleText = titleText;
      }
    },
  },
});

export const dailyReducer = dailySlice.reducer;
