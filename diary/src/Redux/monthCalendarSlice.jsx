/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */

import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { MONTH_CALENDAR_NAME } from './sliceName';

export const monthCalendarSlice = createSlice({
  name: MONTH_CALENDAR_NAME,
  initialState: {
    monthCalendar: {},
  },
  reducers: {
    setCalendar: (state, { payload }) => {
      state.monthCalendar = payload;
    },
    setTodo: ({ monthCalendar }, { payload: { dayInfo, text } }) => {
      const todo = {
        id: v4(),
        date: dayInfo.locdate,
        todoContent: text,
      };
      monthCalendar.map((week) => week.map((day) => {
        if (day.locdate === dayInfo.locdate) {
          day.todos = [...day.todos, todo];
        }
      }));
    },
    delTodo: ({ monthCalendar }, { payload: { date, id } }) => {
      monthCalendar.map((week) => week.map((day) => {
        if (day.locdate === date) {
          day.todos = [...day.todos.filter((todo) => todo.id !== id)];
        }
      }));
    },
    editTodo: ({ monthCalendar }, { payload: { todo, text } }) => {
      monthCalendar.map((week) => week.map((day) => {
        if (day.locdate === todo.date) {
          const findTodo = day.todos.find((getTodo) => getTodo.id === todo.id);
          findTodo.todoContent = text;
        }
      }));
    },
  },
});

export const monthCalendarReducer = monthCalendarSlice.reducer;
