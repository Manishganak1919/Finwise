import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isEmailVerified: boolean;
  isMobileVerified: boolean;
}

const initialState: UserState = {
  isEmailVerified: false,
  isMobileVerified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmailVerified: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerified = action.payload;
    },
    setMobileVerified: (state, action: PayloadAction<boolean>) => {
      state.isMobileVerified = action.payload;
    },
  },
});

export const { setEmailVerified, setMobileVerified } = userSlice.actions;
export default userSlice.reducer;
