
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    """
    My first query
    """
    hello: String!

    pokemons: [Pokemon!]!
  }
`

export const resolvers = {
  Query: {
    hello: () => 'world',
    pokemons: (_, _args, { apis: { pokeApi }}, _info) => {
      return pokeApi.queryPokemonMeta()
    }
  }
}
