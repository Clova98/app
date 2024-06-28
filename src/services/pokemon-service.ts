import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";

export default class PokemonService {
  static pokemons: Pokemon[] = POKEMONS;
  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

  static getAuthToken(): string | null {
    const token = localStorage.getItem('authToken');
    console.log('Auth token:', token); // Ajout d'un log pour vérifier le jeton
    return token;
  }

  static login(username: string, password: string): Promise<void> {
    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        console.log('Token stored:', data.token); // Message de débogage
      } else {
        throw new Error('Login failed');
      }
    })
    .catch(error => {
      this.handleError(error);
      throw error; // Rethrow the error for further handling
    });
  }

  static getPokemons(): Promise<Pokemon[]> {
    const token = this.getAuthToken();
    return fetch('http://localhost:3000/api/pokemons', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Response status:', response.status); // Ajout d'un log pour vérifier le statut de la réponse
      if (!response.ok) {
        throw new Error('Failed to fetch pokemons');
      }
      return response.json();
    })
    .catch(error => this.handleError(error));
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    const token = this.getAuthToken();
    return fetch(`http://localhost:3000/api/pokemons/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => this.isEmpty(data) ? null : data)
    .catch(error => this.handleError(error));
  }

  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    const token = this.getAuthToken();
    return fetch(`http://localhost:3000/api/pokemons/${pokemon.id}`, {
      method: 'PUT',
      body: JSON.stringify(pokemon),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .catch(error => this.handleError(error));
  }

  static deletePokemon(pokemon: Pokemon): Promise<{}> {
    const token = this.getAuthToken();
    return fetch(`http://localhost:3000/api/pokemons/${pokemon.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .catch(error => this.handleError(error));
  }

  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    delete pokemon.created;
    const token = this.getAuthToken();

    return fetch(`http://localhost:3000/api/pokemons`, {
      method: 'POST',
      body: JSON.stringify(pokemon),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .catch(error => this.handleError(error));
  }

  static searchPokemon(term: string): Promise<Pokemon[]> {
    const token = this.getAuthToken();
    return fetch(`http://localhost:3000/api/pokemons?q=${term}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .catch(error => this.handleError(error));
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}
