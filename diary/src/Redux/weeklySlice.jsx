import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const calNAME = "weeklyPlanner";

export const weeklySlice = createSlice({
  name: calNAME,
  initialState: {
    weeklyContent: [],
  },
<<<<<<< HEAD
  reducers: {
    setWeek: (state, action) => {
      state.weeklyContent = action.payload;
    },
    setWeekText: (state, action) => {
      // console.log(action.payload, current(state.weeklyContent[action.payload.idx]))
      state.weeklyContent[action.payload.idx].textContent =
        action.payload.content;
    },
  },
});
=======
  reducers:{
    setWeek: (state, action) => {
      state.weeklyContent = action.payload 
    },
    setWeekText: (state, action) => {
      console.log(action)
      state.weeklyContent[action.payload.idx].text= action.payload.content
    },
  }
}); 
>>>>>>> main

export const weeklyReducer = weeklySlice.reducer;
