import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../../share/types';

const initialState: UserInfo = {
  fullName: '',
  birth: '',
  email: '',
  phoneNumber: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserInfo>) => {
      const { fullName, birth, email, phoneNumber } = action.payload;
      state.fullName = fullName;
      state.birth = birth;
      state.email = email;
      state.phoneNumber = phoneNumber;
    },
    signOut: (state) => {
      return initialState;
    },
    updateUser: (state, action: PayloadAction<UserInfo>) => {
      const { fullName, birth, email, phoneNumber } = action.payload;
      state.fullName = fullName;
      state.birth = birth;
      state.email = email;
      state.phoneNumber = phoneNumber;
    },
  },
});
export const { signIn, signOut, updateUser } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
export const selectUser = (state: any) => state.user;
export default UserReducer;
