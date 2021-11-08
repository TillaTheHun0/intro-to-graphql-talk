
import connect from 'hyper-connect'

const HYPER = process.env.HYPER

export const hyper = connect(HYPER)

export const fetchMeta = (selector = {}) => {
  console.log('querying pokemon meta')

  return hyper().data.query(selector, { limit: 1000 }).then(res => res.docs)
}

export const fetchMetaByName = (name) => {
  console.log('Fetching pokemon meta by name')

  return hyper().data.query({
    name
  }).then(res => res.docs.pop())
}
