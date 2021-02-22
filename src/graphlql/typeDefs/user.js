const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getUser(token: String!): User
    topSeller: [TopSeller]
  }

  extend type Mutation {
    newUser(input: UserInput): User!
    authUser(input: AuthInput): Token
    logoutUser(id: ID!): String
  }

  input UserInput {
    email: String!
    username: String!
    firstName: String!
    lastName: String!
    password: String!
  }

  type Token {
    token: String
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type User {
    id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    createdAt: String
    updatedAt: String
  }
  type TopSeller{
    total: Float
    seller: [User]
  }
`;
