import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUser, logout} from '@store/asyncFuncs';

interface UserState {
  name: string | null;
  email: string | null;
  image: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  image: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{email: string; name: string; image: string}>,
    ) => {
      const {email, name, image} = action.payload;
      state.email = email;
      state.name = name;
      state.image = image;
    },
    removeUser: state => {
      state.email = null;
      state.name = null;
      state.image = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
      const {name, email, image} = action.payload;

      state.email = email;
      state.name = name;
      state.image = image;
    });
    builder.addCase(logout.fulfilled, state => {
      state.email = null;
      state.name = null;
      state.image = null;
    });
  },
});

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
