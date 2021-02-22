const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        getProducts:[Product]
        getProduct(id: ID!): Product
        searchProduct(text: String!): [Product]
    }
    extend type Mutation {
        newProduct(input: ProductInput): Product
        updateProduct(input: ProductInput, id: ID!): Product
        deleteProduct(id: ID!): String
    }

    input ProductInput {
        model: String!
        brand: String!
        stock: Int!
        price: Float!
    }

    type Product {
        id: ID
        brand:String
        model: String
        price: Float
        stock: Int
        createdAt: String
        updatedAt: String
    }
`