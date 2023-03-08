import { googleAuthSlice } from './googleAuthSlice';
import { calendarSlice } from './calendarSlice';
import { weeklySlice } from './weeklySlice';
import { editorContentSlice } from './editorContentSlice';
import { dailySlice } from './dailySlice';

export const { setAuth, removeAuth } = googleAuthSlice.actions;

export const { setCal, setTodo, delTodo, editTodo } = calendarSlice.actions;

export const { setWeek } = weeklySlice.actions;

export const { setEditorContent } = editorContentSlice.actions;

export const { setDaily, setDate, setEditor, setTitle } = dailySlice.actions;