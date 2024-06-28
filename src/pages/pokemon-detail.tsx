import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import PokemonService from '../services/pokemon-service';

type Params = { id: string };

const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    PokemonService.getPokemon(+match.params.id)
      .then(pokemon => {
        if (isMounted) {
          console.log('Fetched pokemon:', pokemon); 
          setPokemon(pokemon);
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          console.error('Error fetching pokemon:', error);
          setError('Failed to fetch pokemon');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [match.params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pokemon) {
    return <div>No Pokemon found.</div>;
  }

  return (
    <div>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <h2 className="header center">{pokemon.name}</h2>
          <div className="card hoverable">
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
              <Link to={`/pokemons/edit/${pokemon.id}`} className="btn-floating halfway-fab waves-effect waves-light">
                <i className="material-icons">edit</i>
              </Link>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <table className="bordered striped">
                  <tbody>
                    <tr>
                      <td>Nom</td>
                      <td><strong>{pokemon.name}</strong></td>
                    </tr>
                    <tr>
                      <td>Points de vie</td>
                      <td><strong>{pokemon.hp}</strong></td>
                    </tr>
                    <tr>
                      <td>Dégâts</td>
                      <td><strong>{pokemon.cp}</strong></td>
                    </tr>
                    <tr>
                      <td>Types</td>
                      <td>
                        {pokemon.types && pokemon.types.map(type => (
                          <span key={type} className={formatType(type)}>{type}</span>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Date de création</td>
                      <td>{formatDate(pokemon.created)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-action">
                <Link to="/">Retour</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonsDetail;
