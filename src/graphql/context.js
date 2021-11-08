
import * as metaClient from '../clients/connect.js'
import * as pokeClient from '../clients/pokeApi.js'
import {
  findMoveByName,
  findPokemonByName,
  findPokemonMetaByName
} from '../dataloaders/pokemon.js'

import { PokeApi } from '../apis/PokeApi.js'

const addClientsContext = async (context) => ({
  ...context,
  clients: {
    hyper: metaClient.hyper,
    metaClient,
    pokeClient
  }
})

export const addDataloadersContext = async (context) => ({
  ...context,
  dataloaders: {
    findPokemonMetaByName: findPokemonMetaByName({ hyper: metaClient.hyper }),
    findPokemonByName: findPokemonByName({ client: pokeClient }),
    findMoveByName: findMoveByName({ client: pokeClient })
  }
})

const addApisContext = async (context) => ({
  ...context,
  apis: {
    pokeApi: PokeApi(context)
  }
})

// reduced to build out a graphql context
const contexters = [
  addClientsContext,
  addDataloadersContext,
  addApisContext
]

export const buildContext = async ({ req, res }) => contexters.reduce(
  async (acc, contexter) => ({
    ...await acc,
    ...await contexter(await acc)
  }),
  Promise.resolve({ req, res })
)
