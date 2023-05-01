import { createSlice } from '@reduxjs/toolkit';

const NAME = 'googleAuth';

export const googleAuthSlice = createSlice({
  name: NAME,
  initialState: {
    userInfo: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state.userInfo = action.payload.data;
      action.payload.setUserInfoCookies(action.payload.data);
    },
    removeAuth: (state) => {
      state.userInfo = {};
    },
  },
});

export const googleAuthReducer = googleAuthSlice.reducer;
