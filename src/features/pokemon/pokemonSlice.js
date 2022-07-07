import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonDetails } from './thunks';
import { capitalizeString } from '../../helpers';

export const getPokemonList = (state) => state.pokemon.results;

export const pokemonSlice = createSlice({
  loading: false,
  name: 'pokemon',
  initialState: {
    selected: {},
    captured: [],
    results: [],
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    addCaptured: (state, action) => {
      state.captured.push(action.payload);
    },
    removeCaptured: (state, action) => {
      state.captured = state.captured.filter((pokemon) => pokemon.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.pending, (state) => ({ ...state, loading: true }));
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
      const combinedArrays = [...state.results, ...action.payload.results];
      const unique = combinedArrays.reduce(
        (acc, curr) =>
          acc.find((v) => v.name === curr.name) ? acc : [...acc, curr],
        []
      );
      return { ...state, ...action.payload, results: unique }
    });
    builder.addCase(fetchPokemonDetails.fulfilled, (state, action) => {
      const types = action.payload.types.map(a => a.type.name);
      const stats = action.payload.stats.map(a => [ capitalizeString(a.stat.name), a.base_stat ]);
      const details = { ...action.payload, types, mainType: types[0], stats };

      return {
        ...state,
        results: state.results.map(pokemon => 
          pokemon.name === action.payload.name
            ? { ...pokemon, ...details }
            : pokemon
          ),
        loading: false,
      }
    });
  },
});

export const { setSelected, addCaptured, removeCaptured } = pokemonSlice.actions;

export default pokemonSlice.reducer;
