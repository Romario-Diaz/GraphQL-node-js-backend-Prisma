import { ApolloServer } from 'apollo-server'

// query
const typeDefs = `
  type Query {
    info: String!
  }
`

// resolveres
const resolvers = {
  Query: {
    info: () => `This is the API of Platzi Node GraphQL`
  }
}

// iniciar servidor
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => console.log(`Server is running on ${url}`))
