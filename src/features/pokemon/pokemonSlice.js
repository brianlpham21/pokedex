import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonDetails } from './thunks';

export const getPokemonList = (state) => state.pokemon.results;

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    loading: false,
    selected: {},
    captured: [],
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    addCaptured: (state, action) => {
      state.captured.push(action.payload);
    }
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

export const { setLoadingStatus, setSelected, addCaptured } = pokemonSlice.actions;

export default pokemonSlice.reducer;
