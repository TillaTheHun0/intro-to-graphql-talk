
import { mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from '@graphql-tools/schema'

import * as QuerySchema from './Query/query.schema.js'

// The GraphQL schema, reduced from miniature bits of schema
const { typeDefs, resolvers } = [
  QuerySchema
].reduce(
  (curSchema, { typeDefs, resolvers = {} }) => ({
    typeDefs: [...curSchema.typeDefs, typeDefs],
    resolvers: mergeDeepRight(curSchema.resolvers, resolvers)
  }),
  { typeDefs: [], resolvers: {} }
)

export const buildSchema = async () => makeExecutableSchema({
  typeDefs,
  resolvers
})
