import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../services/pokemon-service';
import { Link } from 'react-router-dom';
import PokemonSearch from '../components/pokemon-search';

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    PokemonService.getPokemons()
      .then(response => {
        console.log('Pokemons fetched:', response.data); // Accéder à la propriété `data`
        setPokemons(response.data); // Utiliser `response.data`
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pokemons:', error);
        setError('Failed to fetch pokemons');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (pokemons.length === 0) {
    return <div>No Pokemons found.</div>;
  }

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container"> 
        <div className="row">
          <PokemonSearch />
          {pokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))}
        </div>
      </div>
      <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
        style={{position: 'fixed', bottom: '25px', right: '25px'}}
        to="/pokemon/add">
        <i className="material-icons">add</i>
      </Link>
    </div> 
  );
}

export default PokemonList;
