
import { purge } from '../src/seed.js'

purge(process.env.PURGE_CONFIRM === 'true').then(console.log).catch(console.error)
