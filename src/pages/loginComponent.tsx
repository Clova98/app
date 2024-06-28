import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonService from '../services/pokemon-service';

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await PokemonService.login(username, password);
      setError(null);
      history.push('/pokemons'); // Redirige vers la liste des Pokémon après connexion
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginComponent;
