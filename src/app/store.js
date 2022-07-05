import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import pokemonListeners from '../features/pokemon/listeners';

const middleware = [
  ...getDefaultMiddleware()
    .prepend(pokemonListeners)
];

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware,
});