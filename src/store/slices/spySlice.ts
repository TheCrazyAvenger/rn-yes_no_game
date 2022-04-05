import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SpyState {
  time: number | null;
  spyHint: boolean;
  spyHintNumber: number | null;
  spyLocations: any;
  roles: boolean;
  locations: any;
  rolesList: any;
  location: any;
}

const initialState: SpyState = {
  time: null,
  spyHint: false,
  spyHintNumber: 0,
  roles: false,
  spyLocations: null,
  locations: null,
  rolesList: null,
  location: null,
};

const spySlice = createSlice({
  name: 'spy',
  initialState,
  reducers: {
    setGameData: (state, action: PayloadAction<any>) => {
      const {
        time,
        spyHint,
        spyHintNumber,
        roles,
        spyLocations,
        locations,
        rolesList,
        location,
      } = action.payload;

      state.time = time;
      state.spyHint = spyHint;
      state.spyHintNumber = spyHintNumber;
      state.roles = roles;
      state.spyLocations = spyLocations;
      state.locations = locations;
      state.rolesList = rolesList;
      state.location = location;
    },
    resetGameData: state => {
      state.time = null;
      state.spyHint = false;
      state.spyHintNumber = 0;
      state.roles = false;
      state.spyLocations = null;
      state.locations = null;
      state.rolesList = null;
      state.location = null;
    },
  },
});

export const {setGameData, resetGameData} = spySlice.actions;
export default spySlice.reducer;
