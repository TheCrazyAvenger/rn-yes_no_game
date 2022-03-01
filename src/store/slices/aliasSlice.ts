import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AliasState {
  round: number;
  game: number;
  team: string | null;
}

const initialState: AliasState = {
  round: 1,
  game: 1,
  team: null,
};

const aliasSlice = createSlice({
  name: 'alias',
  initialState,
  reducers: {
    setRound: (state, action: PayloadAction<number>) => {
      state.round = action.payload;
    },
    setGame: (state, action: PayloadAction<number>) => {
      state.game = action.payload;
    },
    setTeam: (state, action: PayloadAction<string>) => {
      state.team = action.payload;
    },
  },
});

export const {setGame, setRound, setTeam} = aliasSlice.actions;
export default aliasSlice.reducer;
