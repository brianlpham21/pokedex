import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonDetails } from './thunks';

export const getPokemonList = (state) => state.pokemon.results;

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    loading: false,
    page: 1,
    selected: {},
    captured: [],
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
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
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => ({ ...state, ...action.payload }));
    builder.addCase(fetchPokemonDetails.fulfilled, (state, action) => {
      return {
        ...state,
        results: state.results.map(pokemon => 
          pokemon.name === action.payload.name
            ? { ...pokemon, details: action.payload }
            : pokemon
          ),
        loading: false,
      }
    });
  },
});

export const { setLoadingStatus, setPage, setSelected, setDetails } = pokemonSlice.actions;

export default pokemonSlice.reducer;
