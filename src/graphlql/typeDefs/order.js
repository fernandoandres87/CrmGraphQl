const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getOrders: [Order]
    getOrderBySeller: [Order]
    getOrder(id: ID!): Order
    getOrderByState(state: String!): [Order]
  }
  extend type Mutation {
    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): String
  }

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: ID
    seller: ID
    state: StateOrder
  }
  type OrderGroup {
    id: ID
    quantity: Int
  }

  input OrderProductInput {
    id: ID
    quantity: Int
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    state: StateOrder
  }

  enum StateOrder {
    PENDING
    COMPLETED
    CANCELLED
  }
`;
