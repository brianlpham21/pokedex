import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCallSettings } from '../../../constants';

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (url = `https://pokeapi.co/api/v2/pokemon?limit=${apiCallSettings}&offset=0`) => {
    const response = await fetch(url);
    const pokemonListData = await response.json();

    return pokemonListData;
  }
)