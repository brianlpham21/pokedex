import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (url) => {
    const response = await fetch(url);
    const pokemonDetail = await response.json();

    return pokemonDetail;
  }
)