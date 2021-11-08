
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
    moves: async (pokemon, _args, { apis: { pokeApi } }) => {
      console.log('fetching moves')
      const moves = await pokeApi.findPokemonMoves(pokemon.name)

      return moves
    }
  }
}
