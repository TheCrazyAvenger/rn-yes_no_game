import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUser, logout} from '@store/asyncFuncs';

interface UserState {
  name: string | null;
  email: string | null;
  token: string | null;
  image: string | null;
  id: string | null;
  stories: any;
  bg: number;
}

const initialState: UserState = {
  name: null,
  email: null,
  token: null,
  image: null,
  id: null,
  stories: null,
  bg: 2,
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
        token: string;
      }>,
    ) => {
      const {email, name, image, id, token} = action.payload;
      state.email = email;
      state.name = name;
      state.image = image;
      state.id = id;
      state.token = token;
    },
    removeUser: state => {
      state.email = null;
      state.name = null;
      state.image = null;
      state.id = null;
      state.token = null;
    },
    addStories: (state, action: PayloadAction<any>) => {
      state.stories = action.payload;
    },
    addReview: (state, action: PayloadAction<string>) => {
      state.stories.find(
        (story: any) => story.id === action.payload,
      ).reviewedByUser = true;
    },
    editUserProfile: (
      state,
      action: PayloadAction<{email: string; name: string; image: string}>,
    ) => {
      const {email, name, image} = action.payload;
      state.email = email;
      state.name = name;
      state.image = image;
    },
    setBg: (state, action: PayloadAction<number>) => {
      state.bg = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
      const {token, id} = action.payload;

      state.token = token;
      state.id = id;
    });
    builder.addCase(logout.fulfilled, state => {
      state.email = null;
      state.name = null;
      state.image = null;
      state.id = null;
      state.token = null;
    });
  },
});

export const {
  addUser,
  removeUser,
  addStories,
  addReview,
  editUserProfile,
  setBg,
} = userSlice.actions;
export default userSlice.reducer;
