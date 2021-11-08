
export const PokeApi = (context) => ({
  async queryPokemonMeta (selector) {
    const { clients: { metaClient } } = context
    return metaClient.fetchMeta(selector)
  },

  async findPokemonMetaByName (name) {
    const { dataloaders: { findPokemonMetaByName } } = context
    return findPokemonMetaByName.load(name)
  },

  async findPokemonByMove (moveName) {
    const { dataloaders: { findMoveByName } } = context
    const move = await findMoveByName.load(moveName)

    return move.learned_by_pokemon.map(p => ({ name: p.name }))
  },

  async findPokemonMoves (name) {
    const { dataloaders: { findPokemonByName, findMoveByName } } = context
    const pokemon = await findPokemonByName.load(name)

    const moves = await Promise.all(
      pokemon.moves.map(m => findMoveByName.load(m.move.name))
    )

    return moves.map(m => ({ name: m.name, type: m.type.name }))
  },

  async addPokemonMeta ({ name, favorite, starter }) {
    const { dataloaders: { findPokemonByName, findPokemonMetaByName }, clients: { hyper } } = context

    let pokemon
    try {
      pokemon = await findPokemonByName.load(name)
    } catch {
      const error = new Error('Pokemon not found')
      error.type = 'NotAPokemonError'
      throw error
    }

    if (!pokemon || pokemon === 'Not Found') {
      const error = new Error('Pokemon not found')
      error.type = 'NotAPokemonError'
      throw error
    }

    if (await findPokemonMetaByName.load(name)) {
      const error = new Error('Pokemon meta already exists')
      error.type = 'PokemonExistsError'
      return error
    }

    const res = await hyper().data.add({
      id: `${pokemon.id}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      starter,
      favorite,
      docType: 'pokemon'
    })

    console.log(res)

    findPokemonMetaByName.clear(name)
    return findPokemonMetaByName.load(name)
  }
})
