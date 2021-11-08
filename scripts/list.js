import { hyper } from '../src/clients/connect.js'

hyper().data.list().then(console.log).catch(console.error)
