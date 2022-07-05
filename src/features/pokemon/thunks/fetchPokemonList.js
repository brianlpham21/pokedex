import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0') => {
    const response = await fetch(url);
    const pokemonListData = await response.json();

    return pokemonListData;
  }
)