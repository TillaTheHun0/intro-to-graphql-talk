
import { mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from '@graphql-tools/schema'

import * as QuerySchema from './Query/query.schema.js'
import * as PokemonSchema from './Pokemon/pokemon.schema.js'

// The GraphQL schema, reduced from miniature bits of schema
const { typeDefs, resolvers } = [
  QuerySchema,
  PokemonSchema
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
