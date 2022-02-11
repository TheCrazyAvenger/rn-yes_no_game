import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUser, logout} from '@store/asyncFuncs';

interface UserState {
  name: string | null;
  email: string | null;
  image: string | null;
  id: string | null;
  stories: any;
}

const initialState: UserState = {
  name: null,
  email: null,
  image: null,
  id: null,
  stories: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{
        email: string;
        name: string;
        image: string;
        id: string;
      }>,
    ) => {
      const {email, name, image, id} = action.payload;
      state.email = email;
      state.name = name;
      state.image = image;
      state.id = id;
    },
    removeUser: state => {
      state.email = null;
      state.name = null;
      state.image = null;
      state.id = null;
    },
    addStories: (state, action: PayloadAction<any>) => {
      state.stories = action.payload;
    },
    addReview: (state, action: PayloadAction<string>) => {
      state.stories.find(
        (story: any) => story.id === action.payload,
      ).reviewedByUser = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
      const {name, email, image, id} = action.payload;

      state.email = email;
      state.name = name;
      state.image = image;
      state.id = id;
    });
    builder.addCase(logout.fulfilled, state => {
      state.email = null;
      state.name = null;
      state.image = null;
      state.id = null;
    });
  },
});

export const {addUser, removeUser, addStories, addReview} = userSlice.actions;
export default userSlice.reducer;
