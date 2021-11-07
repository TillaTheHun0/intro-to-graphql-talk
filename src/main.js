
import express from 'express'

import { mountApollo } from './graphql/server.js'

const PORT = 4000

export async function start () {
  const app = express()

  app.get('/', (_req, res) => res.json({ ok: true }))

  const graph = await mountApollo(app)

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${graph.graphqlPath}`)
  })
}
