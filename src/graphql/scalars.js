import { GraphQLError, GraphQLScalarType } from 'graphql'
import { gql } from 'apollo-server-express'

const uppercaseScalar = new GraphQLScalarType({
  name: 'UpperCaseString',
  description: 'an uppercase string',
  serialize: value => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
  parseValue: value => {
    if (value[0].toUpperCase() !== value[0]) {
      throw new GraphQLError('String should be uppercased')
    }

    return value
  }
})

export const typeDefs = gql`
  scalar UpperCaseString
`

export const resolvers = {
  UpperCaseString: uppercaseScalar
}
