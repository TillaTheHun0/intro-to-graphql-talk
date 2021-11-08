
import ImmutableDataloader from 'immutable-dataloader'
import pMap from 'p-map'
import { evolve, pick, slice } from 'ramda'

const Dataloader = ImmutableDataloader.default

export const findPokemonByName = ({ client }) => new Dataloader(
  names => pMap(
    names,
    name => client.fetchPokemon(name)
      .then(pick(['id', 'name', 'moves']))
      // Reducing size of array for the sake of the demo
      .then(evolve({
        moves: slice(0, 5)
      })),
    { concurrency: 5 }
  )
)

export const findMoveByName = ({ client }) => new Dataloader(
  moves => pMap(
    moves,
    async move => client.fetchMove(move)
      .then(pick(['name', 'learned_by_pokemon', 'type']))
      // Reducing size of array for the sake of the demo
      .then(evolve({
        learned_by_pokemon: slice(0, 10)
      })),
    { concurrency: 5 }
  )
)

export const findPokemonMetaByName = ({ hyper }) => new Dataloader(
  async names => {
    names = names.map(
      name => name.charAt(0).toUpperCase() + name.slice(1)
    )
    // fetch all documents from hyper, that we need, all at once
    const { docs } = await hyper().data.query({
      name: {
        $in: names.map(
          name => name.charAt(0).toUpperCase() + name.slice(1)
        )
      }
    }, { limit: 1000 })

    return names.map(
      n => docs.find(d => d.name === n)
    )
  }
)
