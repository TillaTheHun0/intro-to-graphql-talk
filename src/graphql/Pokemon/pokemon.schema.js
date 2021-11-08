
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Pokemon {
    id: ID!
    name: String!
    starter: Boolean!
    favorite: Boolean!
    moves: [Move!]!
  }
`

export const resolvers = {
  Pokemon: {
    name: async (pokemon) => {
      const { name } = pokemon
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    favorite: async (pokemon, _args, { apis: { pokeApi } }) => {
      const res = await pokeApi.findPokemonMetaByName(pokemon.name)
      return !!(res && res.favorite)
    },
    moves: async (pokemon, _args, { apis: { pokeApi } }) => {
      console.log('fetching moves')
      const moves = await pokeApi.findPokemonMoves(pokemon.name)

      return moves
    }
  }
}
