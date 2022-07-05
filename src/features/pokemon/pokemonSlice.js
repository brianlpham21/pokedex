import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    loading: false,
    list: [],
    page: 1,
    selected: {},
    captured: [],
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      state.page -= 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    setDetails: (state, action) => {
      return {
        ...state,
        list: state.list.map(pokemon => 
          pokemon.id === action.id
            ? { ...pokemon, details: action.payload }
            : pokemon
          )
      }
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setLoadingStatus, incrementPage, decrementPage, setPage, setList, setSelected, setDetails } = pokemonSlice.actions;

export default pokemonSlice.reducer;
