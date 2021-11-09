# Pokemon GraphQL Workshop

Codebase for the [CDCu Introduction to GraphQL APIs workshop](https://www.charlestondigitalcorridor.com/talent/cdcu/1630196638548-introduction-graphql-apis/)

## Prerequisites

- Node@16
- Hyper Cloud Application (sign up (here)[https://docs.hyper.io/cloud#zx-how-do-i-get-started-with-hyper])

## Setup

Once you've [created a Hyper Cloud Application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application),
copy you connection string and place into a `.env` file at the root of your project like:

`.env`

```
HYPER=your-connection-string
```

- `npm i`
- `npm run setup`
- `npm run list`

You should see a list of JSON documents of `docType` `pokemon` listed to your console

## Parts

- 00: Review the boilerplate
- 01: mount apollo on express
- 02: add `pokemons` `query` and resolver
- 03: add filtering pokemon based on `favorite`
- 04: add `Move` type and add to `Pokemon` type
- 05: move `moves` to a separate resolver
- 06: add `pokemon` on `Move`
- 07: `favorite` and `name` resolvers
- 08: `addPokemon` mutation
- 09: BONUS: Schema Stitching
