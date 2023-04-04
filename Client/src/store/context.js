import { configureStore, createSlice } from "@reduxjs/toolkit";

const initAuthState = {
  token: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initAuthState,
  reducers: {
    update(state, action) {
      console.log(action);
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    restore(state) {
      state.token = initAuthState.token;
      state.email = initAuthState.email;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export const authActions = authSlice.actions;

export default store;
