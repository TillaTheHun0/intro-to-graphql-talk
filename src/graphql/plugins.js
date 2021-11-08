
import http from 'http'

import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'

export const buildPlugins = async (app) => [
  ApolloServerPluginDrainHttpServer({ httpServer: http.createServer(app) }),
  process.env.NODE_ENV === 'production'
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        'request.credentials': 'include'
      }
    })
]
