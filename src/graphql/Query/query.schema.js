
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    """
    My first query
    """
    hello: String!

    """
    Fetch a list of Pokemon, optionally filtering on whether
    the pokemon is a favorite or not
    """
    pokemons (criteria: PokemonCriteriaInput): [Pokemon!]!
  }

  input PokemonCriteriaInput {
    favorite: Boolean
  }
`

export const resolvers = {
  Query: {
    hello: () => 'world',
    pokemons: async (_, { criteria }, { apis: { pokeApi } }, _info) => {
      const pokemons = await pokeApi.queryPokemonMeta(criteria)
      return pokemons
    }
  }
}
