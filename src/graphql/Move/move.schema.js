
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Move {
    name: String!
    type: Type!
    pokemon: [Pokemon!]!
  }

  enum Type {
    normal
    fighting
    flying
    poison
    ground
    rock
    bug
    ghost
    steel
    fire
    water
    grass
    electric
    psychic
    ice
    dragon
    dark
    fairy
    unknown
    shadow
  }
`

export const resolvers = {
  Move: {
    pokemon: (move, _args, { apis: { pokeApi } }) => {
      return pokeApi.findPokemonByMove(move.name)
    }
  }
}
