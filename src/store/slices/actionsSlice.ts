import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ActionsState {
  actionYesNo: boolean;
  showReview: boolean;
  yesnoGoBack: boolean;
  openYesNoRules: boolean;
}

const initialState: ActionsState = {
  actionYesNo: false,
  showReview: false,
  yesnoGoBack: false,
  openYesNoRules: false,
};

const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    toggleYesNo: (state, action: PayloadAction<boolean>) => {
      state.actionYesNo = action.payload;
    },
    toggleReview: (state, action: PayloadAction<boolean>) => {
      state.showReview = action.payload;
    },
    toggleYesnoGoBack: (state, action: PayloadAction<boolean>) => {
      state.yesnoGoBack = action.payload;
    },
    toggleYesnoRules: (state, action: PayloadAction<boolean>) => {
      state.openYesNoRules = action.payload;
    },
  },
});

export const {toggleYesNo, toggleReview, toggleYesnoGoBack, toggleYesnoRules} =
  actionsSlice.actions;
export default actionsSlice.reducer;
