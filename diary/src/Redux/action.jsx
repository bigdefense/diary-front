import { googleAuthSlice } from './googleAuthSlice';
import { monthCalendarSlice } from './monthCalendarSlice';
import { weeklySlice } from './weeklySlice';
import { dailySlice } from './dailySlice';
import { stickerSlice } from './stickerSlice';
import { monthSelectorSlice } from './monthSelectorSlice';

export const { setAuth, removeAuth } = googleAuthSlice.actions;

export const {
  setCalendar, setTodo, delTodo, editTodo,
} = monthCalendarSlice.actions;

export const {
  setWeekly, setlocWeek, setSelectedWeek, setTextContent, setMoveToWeek,
} = weeklySlice.actions;

export const {
  setDaily, setDate, setEditor, setTitle,
} = dailySlice.actions;

export const {
  setSticker,
  removeSticker,
  setPosition,
  setResize,
  addTableSticker,
  setSelect,
  resetSelect,
} = stickerSlice.actions;

export const {
  setMonthRouter,
  setMoveToLastMonth,
  setMoveToNextMonth,
} = monthSelectorSlice.actions;
