const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getClients: [Client]
    getClientSeller: [Client]
    getClient(id: ID!): Client
    topClient: [TopClient]

  }
  extend type Mutation {
    newClient(input: ClientInput): Client
    updateClient(input: ClientInput, id: ID!): Client
    deleteClient(id: ID!): String
  }
  input ClientInput {
    firstName: String!
    lastName: String!
    company: String!
    email: String!
    phone: String
  }
  type Client {
    id: ID
    firstName: String
    lastName: String
    company: String
    email: String
    seller: ID
  }
  type TopClient {
    total: Float
    client: [Client]
  }
`;
