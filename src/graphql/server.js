
import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from './schema.js'
import { buildPlugins } from './plugins.js'
import { buildContext } from './context.js'

export async function mountApollo (app) {
  const server = new ApolloServer({
    schema: await buildSchema(),
    context: expressContext => buildContext(expressContext),
    plugins: await buildPlugins(app)
  })

  await server.start()
  server.applyMiddleware({ app })

  return server
}
