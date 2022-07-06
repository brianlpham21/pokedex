import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import pokedexLogo from '../assets/pokedex_logo.png'
import pokeball from '../assets/pokeball.png'

export default function Header() {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    const pathname = location.pathname;
    setPathname(pathname);
  }, [location])
  
  return (
    <nav className="header">
      <Link to="/"><img className="header-pokedex-logo" src={pokedexLogo} alt="pokemon_logo" /></Link>
      {pathname === '/'
        ? (
          <Link to="/captured" className="captured-pm-button">
            <img className="header-pokeball-image" src={pokeball} alt="pokeball" />
            <span className="captured-pm-button-text">Captured Pokemons</span>
          </Link>
        ) : <Link to="/" className="back-button">Back</Link>
      }
    </nav>
  )
}
