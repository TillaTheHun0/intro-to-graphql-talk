
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Pokemon {
    id: ID!
    name: String!
    starter: Boolean!
  }
`

export const resolvers = {}
