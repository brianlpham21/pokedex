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
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '52px' }}>
      <Link to="/"><img src={pokedexLogo} alt="pokemon_logo" style={{ height: '120px', margin: '48px 36px' }} /></Link>
      {pathname === '/'
        ? (
          <Link to="/captured" style={{ display: 'flex', backgroundColor: '#EB5435', alignItems: 'center', borderRadius: '100px', textDecoration: 'none' }}>
            <img src={pokeball} alt="pokeball" style={{ height: '72px' }} />
            <span style={{ color: 'white', fontSize: '36px', paddingRight: '16px' }}>Captured Pokemons</span>
          </Link>
        ) : <Link to="/" style={{ textDecoration: 'none', backgroundColor: 'lightGrey', fontSize: '30px', padding: '15px 50px', borderRadius: '50px', color: 'black' }}>Back</Link>
      }
    </nav>
  )
}
