import pokemon from 'pokemon'

import { hyper } from './clients/connect.js'

const starters = [
  // gen 1
  'Bulbasaur',
  'Charmander',
  'Squirtle',
  'Pikachu',
  // gen 2
  'Chikorita',
  'Cyndaquil',
  'Totodile',
  // gen 3
  'Treecko',
  'Torchic',
  'Mudkip',
  // gen 4
  'Turtwig',
  'Chimchar',
  'Piplup',
  // gen 5
  'Snivy',
  'Tepig',
  'Oshawott',
  // gen 6
  'Chespin',
  'Fennekin',
  'Froakie',
  // gen 7
  'Rowlet',
  'Litten',
  'Popplio'
]

export async function seed () {
  const { ok, docs } = await hyper().data.query({
    docType: 'pokemon'
  }, { limit: 1 })

  if (!ok) {
    throw new Error('Could not fetch current pokemon')
  }

  if (docs.length) {
    throw new Error('Pokemon docs already exist. Cannot perform seed')
  }

  const seedDocs = starters.map((name, idx) => ({
    id: `${pokemon.getId(name)}`,
    name,
    starter: true,
    favorite: idx % 2 === 0,
    docType: 'pokemon'
  }))

  return Promise.all(seedDocs.map(sd => hyper().data.add(sd)))
}

export async function purge (confirm = false) {
  if (!confirm) {
    return
  }

  const { docs } = await hyper().data.query({
    docType: 'pokemon'
  }, { limit: 1000 })

  // See https://docs.hyper.io/create-update-or-delete-multiple-documents
  const deleteBulk = docs.map(d => ({ id: d.id, _deleted: true }))
  return hyper().data.bulk(deleteBulk)
}
