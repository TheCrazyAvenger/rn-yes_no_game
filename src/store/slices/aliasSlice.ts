import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AliasState {
  points: number;
  fee: boolean;
  round: number;
  game: number;
  teams: any;
  teamIndex: number;
  team: string | null;
  lastTeam: string | null;
  words: any;
  currentWord: number;
}

const initialState: AliasState = {
  points: 0,
  fee: false,
  round: 1,
  game: 1,
  team: null,
  teamIndex: 0,
  lastTeam: null,
  teams: null,
  words: null,
  currentWord: 0,
};

const aliasSlice = createSlice({
  name: 'alias',
  initialState,
  reducers: {
    setPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload;
    },
    setFee: (state, action: PayloadAction<boolean>) => {
      state.fee = action.payload;
    },
    setRound: (state, action: PayloadAction<number>) => {
      state.round = action.payload;
    },
    setGame: (state, action: PayloadAction<number>) => {
      state.game = action.payload;
    },
    setTeams: (state, action: PayloadAction<any>) => {
      state.teams = action.payload;
    },
    setTeamsPoint: (state, action: PayloadAction<any>) => {
      const {name, points} = action.payload;

      state.teams = state.teams.map((team: any) =>
        team.team === name
          ? {team: team.team, points: team.points + points}
          : team,
      );
    },
    setTeam: (state, action: PayloadAction<string | null>) => {
      state.team = action.payload;
    },
    setLastTeam: (state, action: PayloadAction<string | null>) => {
      state.lastTeam = action.payload;
    },
    setWords: (state, action: PayloadAction<any>) => {
      state.words = action.payload;
    },
    setCurrentWord: (state, action: PayloadAction<number>) => {
      state.currentWord = action.payload;
    },
    setTeamIndex: (state, action: PayloadAction<number>) => {
      state.teamIndex = action.payload;
    },
  },
});

export const {
  setPoints,
  setFee,
  setGame,
  setRound,
  setTeam,
  setWords,
  setCurrentWord,
  setTeams,
  setLastTeam,
  setTeamIndex,
  setTeamsPoint,
} = aliasSlice.actions;
export default aliasSlice.reducer;
