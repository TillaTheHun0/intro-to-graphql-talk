
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    """
    My first query
    """
    hello: String!
  }
`

export const resolvers = {
  Query: {
    hello: () => 'world',
  }
}
