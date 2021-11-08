
import { mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from '@graphql-tools/schema'

import * as Scalars from './scalars.js'
import * as QuerySchema from './Query/query.schema.js'
import * as MutationSchema from './Mutation/mutation.schema.js'
import * as PokemonSchema from './Pokemon/pokemon.schema.js'
import * as MoveSchema from './Move/move.schema.js'

// The GraphQL schema, reduced from miniature bits of schema
const { typeDefs, resolvers } = [
  Scalars,
  QuerySchema,
  MutationSchema,
  PokemonSchema,
  MoveSchema
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
