import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ActionsState {
  actionYesNo: boolean;
  showReview: boolean;
  yesnoGoBack: boolean;
  aliasGoBack: boolean;
  spyGoBack: boolean;
  openYesNoRules: boolean;
  openAliasRules: boolean;
  openMenu: boolean;
}

const initialState: ActionsState = {
  actionYesNo: false,
  openMenu: false,
  showReview: false,
  yesnoGoBack: false,
  openYesNoRules: false,
  openAliasRules: false,
  aliasGoBack: false,
  spyGoBack: false,
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
    toggleAliasRules: (state, action: PayloadAction<boolean>) => {
      state.openAliasRules = action.payload;
    },
    toggleAliasGoBack: (state, action: PayloadAction<boolean>) => {
      state.aliasGoBack = action.payload;
    },
    toggleOpenMenu: (state, action: PayloadAction<boolean>) => {
      state.openMenu = action.payload;
    },
    toggleSpyGoBack: (state, action: PayloadAction<boolean>) => {
      state.spyGoBack = action.payload;
    },
  },
});

export const {
  toggleYesNo,
  toggleReview,
  toggleYesnoGoBack,
  toggleYesnoRules,
  toggleAliasRules,
  toggleAliasGoBack,
  toggleOpenMenu,
  toggleSpyGoBack,
} = actionsSlice.actions;
export default actionsSlice.reducer;
