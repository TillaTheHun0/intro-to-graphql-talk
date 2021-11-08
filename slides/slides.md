---
marp: true
paginate: true
theme: uncover
class: invert
---

<!--
Slide 1
- Allow everyone to introduce themselves in the room
-->
![w:180](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2000px-GraphQL_Logo.svg.png)
# **Intro to GraphQL**
---

<!-- 

-->
# **Agenda**

- Origins of GraphQL
- What is GraphQL?
- Why use GraphQL?
- Querying GraphQL
- Schema Definition Language (SDL)
- GraphQL Resolvers
- Build a GraphQL server to serve a schema
- **Bonus**: Schema stitching

---

<!-- 
- Talk about experience

Fullstack engineer, like Node and more recently Deno
Like React, and more recently Svelte

Apollo/GraphQL
Built Enterprise level graphs, stitched from over 20 microservices
One of the first folks who had access to Apollo Federation, before it's launch

-->
![bg right contain](https://avatars.githubusercontent.com/u/8246360?v=4)

Tyler
*Principal Software Engineer* @ hyper

---

<!-- 
So what is the origin of GraphQL?
Why was it built? What problems was it trying to address
 -->
![w:300](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2000px-GraphQL_Logo.svg.png)

### **GraphQL**

---

<!-- 
The newfeed was a new thing. Stories with comments and likes and more stories. Lots of relational, nested, recursive data

Everything was shifting to mobile. Folks were using their phones to access Facebook
Mobile devices were not as powerful and couldn't handle lots of data (not a lot of memory)
Mobile bandwidth was also not as powerful, which exacerbated even fetching the data (3G)
    - Markets like India, China where bandwidth was not as capable as in places like US or Korea
 -->
### **Origins**
![bg right contain w:300](https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png)
- The shift to mobile
- The Newsfeed & nested, recursive data
- Sequential REST calls (_lots of endpoints_)
- Implicit contract
- Overfetching data

---

<!-- 
Grabbing user and their posts

- individually
- all at one
- hybrid endpoint
- custom query string selectors

Now what if I want comments on posts?
 -->
## **Rest Bonanza**
```
GET https://foo.com/api/users/1
// grab post ids and query for each post
GET https://foo.com/api/posts/[id]

OR GET https://foo.com/api/users/1/posts

OR GET https://foo.com/api/users/1?include=posts

OR GET https://foo.com/api/users-posts/1

// Get Friends via id?
// GET as users?
GET https://foo.com/api/users/[id]
// resource on user?
OR GET https://foo.com/api/users/1/friends/[id]

// versions?
GET https://foo.com/api/v1/users/[id]
```


---

# **Idea**

- One Endpoint
- Server describes all capabilities
- Client describes requirements to the endpoint
- Endpoint fulfills requirements

---

![w:300](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2000px-GraphQL_Logo.svg.png)

### **GraphQL**

Server Capabilities: `Schema Definition Language`
Client Requirements: `Graph Query Language`
Fulfillment: `GraphQL Runtime`

---

### **This Idea Caught On**

Gatsby, Hasura, Apollo, Contentful, Github, Fauna, Relay, OneGraph, Braintree, Arweave, so many more...

---

### **The Schema**

> The Server Capabilities

Model your business domain as a schema
- Define types and how they relate to each other
  - Think OOP (types reference other types)
  - Fields on types can ref another `Type` or a `Scalar`
- Define _entrypoints_ to those business types
  - Just special reserved types!
    - `Query`
    - `Mutation`
    - `Subscription`

---

<!-- 
  An example schema for a blog.
  Things to note:
    - Everything is a type, even the entrypoints!
    - This doesn't describe where the data comes from
    - Highly Cyclical (The graph in GraphQL)
 -->
```gql
type Author {
  id: ID!
  name: String!
  posts (criteria: AuthorPostsCriteriaInput): [Post!]!
}

type Post {
  id: ID!
  content: String!
  author: Author!
  relatedPosts (criteria: RelatedPostsCriteriaInput): [Post!]!
  likes: [Author!]!
  createdAt: Date!
}

type Query {
  posts (criteria: PostsCriteria!): [Post!]!
}

type Mutation {
  addPost (addPostInput: AddPostInput!): Post!
}
```

---

### **The Query/Mutation**

> The Client Requirements

Write queries according to the schema's entrypoints
- Only get what you need
- In the shape that you need it
- Built in validation (the schema is strongly typed!)
- They're just strings! (syntax resembles `JSON`)

---

<!-- 
  Things to note:
  - loading author where I need it
  - fetching in the shape I need (keeping data as local as possible)
  - only loading fields I want
 -->
```gql
query GetPostAndRelatedPostsById {
  post (criteria: {
    id: "post-1"
  }) {
    content
    author {
      name
    }
    relatedPosts (criteria: {
      after: "2021-09-10T00:00:00.000Z"
    }) {
      content
      author {
        name
      }
      likes {
        id
      }
    }
    createdAt
  }
}
```

---

### **Graph Query Language**
aka `GraphQL`

---

- Fields
- Arguments
- Aliases
- Fragments
- Operation Names
- Variables
- Directives

---

<!--
  Things to note:
  - show request sent to server (query is just a string)
  - show entire schema and how small it is
  - show multiple queries in same operation
  - show arguments
  - show cyclical
  - show aliases
  - show fragments
  - show directives
 -->
### **Let's write some queries!**

`https://countries.trevorblades.com/`

Share a query with the class!
`https://github.com/TillaTheHun0/intro-to-graphql-talk/issues/1`

---

### **Pain Pain, Go Away**
<!-- 
  - Allow migration from deprecated fields to new fields
    - There are even `directives` to encapsulate deprecation **in the schema**
  - No more client side data transformation!
    - just query for the shape the client needs
 -->
- Shape of the result depends **entirely** on client's query
  - Add new fields on server, without breaking clients!
- **No more** _client_ over fetching!
- **No more** multiple REST calls!
- **No more** "mega" REST endpoints
- **No more** "custom" filtering api. The runtime filters fields for you.
- **No more** client side data transformation!
  - just query the shape that you need
  - code to the interface (the schema)

---

### **Break**

---

<!-- 
What we use to write a graphql schema
remember, this defines the servers capabilities
 -->
### **Schema Definition Language (SDL)**
- _Very_ similar to the GraphQL Query Language
- Language Agnostic (any server in any language can define and resolve it)

---

- Type
- Field
- Scalar
  - Enum
  - Custom
- !
- []
- Input
- Union & Interface

---

### **Let's build a server!**

---

### **Pokemon!**

![bg right contain](https://cdn2.bulbagarden.net/upload/a/a7/PSMD_poster.png)

---

<!-- 
Disclaimer
-->
## **Disclaimer**
![bg right contain](https://i.imgflip.com/1yxiot.jpg)

This is just one way to build a GraphQL Server

---

<!-- Create an account on hyper.io then create an app -->
### **Setup**

NodeJS@v16
(https://nodejs.org/en/)

--

Hyper Cloud Application `https://dashboard.hyper.io`

- Sign-in with Github
- Create an app

---

<!-- Take your connection string and place it in a .env file -->
### **Setup**

`https://github.com/TillaTheHun0/intro-to-graphql-talk`

--

Create `.env` file with `HYPER` set to your connection string
`npm i`
`npm run setup`
`npm run dev`

---

### **Use Cases**

- Fetch a list of pokemon
- Fetch whether they are a starter pokemon
