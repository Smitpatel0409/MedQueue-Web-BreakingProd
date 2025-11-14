import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
