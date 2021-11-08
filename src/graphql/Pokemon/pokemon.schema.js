
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Pokemon {
    id: ID!
    name: String!
    starter: Boolean!
    favorite: Boolean!
  }
`

export const resolvers = {}
