import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ActionsState {
  actionYesNo: boolean;
}

const initialState: ActionsState = {
  actionYesNo: false,
};

const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    toggleYesNo: (state, action: PayloadAction<boolean>) => {
      state.actionYesNo = action.payload;
    },
  },
});

export const {toggleYesNo} = actionsSlice.actions;
export default actionsSlice.reducer;
