
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Mutation {
    addPokemon (payload: AddPokemonInput): AddPokemonResult!
  }

  input AddPokemonInput {
    name: UpperCaseString!
    starter: Boolean!
    favorite: Boolean!
  }

  type AddPokemonResult {
    pokemon: Pokemon
  }
`

export const resolvers = {
  Mutation: {
    addPokemon: (_, { payload }, { apis: { pokeApi } }) => {
      return pokeApi.addPokemonMeta(payload)
        .then(pokemon => ({ pokemon }))
    }
  }
}
