
const BASE_URL = 'https://pokeapi.co/api/v2'

export function fetchPokemon (name) {
  console.log(`fetching pokemon by name: ${name}`)

  return fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`)
    .then(res => res.json())
}

export function fetchMove (name) {
  console.log(`fetching move by name: ${name}`)

  return fetch(`${BASE_URL}/move/${name.toLowerCase()}`)
    .then(res => res.json())
}
