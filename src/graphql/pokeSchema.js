
import { introspectSchema, wrapSchema, RenameTypes } from '@graphql-tools/wrap'
import { print } from 'graphql'
import { compose } from 'ramda'

async function fetchContent ({ query, variables }) {
  return fetch(
    'https://graphqlpokemon.favware.tech/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    }
  ).then(res => res.json())
}

function executor ({ document, variables }) {
  return compose(
    fetchContent,
    ({ document, variables }) => ({ query: print(document), variables })
  )({ document, variables })
}

export const getPokeSchema = async () => {
  return wrapSchema({
    schema: await introspectSchema(executor),
    executor,
    transforms: [
      new RenameTypes(name => {
        return `Poke_${name}`
      })
    ]
  })
}

export const pokeSchema = getPokeSchema()
