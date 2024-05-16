import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  welcomeMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("Inside setCredentials action"); // Log when this action is called
      console.log("Payload:", action.payload); // Log the action payload

      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      console.log("Updated userInfo in state and localStorage");

      const expirationTime = new Date();
      expirationTime.setTime(
        expirationTime.getTime() + 30 * 24 * 60 * 60 * 1000
      ); // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },

    setWelcomeMessage: (state, action) => {
      state.welcomeMessage = action.payload;
    },

    logout: (state) => {
      state.userInfo = null;
      state.welcomeMessage = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, setWelcomeMessage, logout } = userSlice.actions;

export default userSlice.reducer;
