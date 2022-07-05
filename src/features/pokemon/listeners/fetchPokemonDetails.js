import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchPokemonList, fetchPokemonDetails } from "../thunks";

export const effect = async ({ payload: { results } }, { dispatch }) => {
  if (results.length) {
    results.map((pokemon) => dispatch(fetchPokemonDetails(pokemon.url)))
  }
};

const { startListening, middleware } = createListenerMiddleware();

startListening({
  actionCreator: fetchPokemonList.fulfilled,
  effect
});

export default middleware;