
import express from 'express'

const PORT = 4000

export async function start () {
  const app = express()

  app.get('/', (_req, res) => res.json({ ok: true }))

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  })
}
