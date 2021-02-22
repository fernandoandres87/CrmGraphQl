const { ApolloServer } = require("apollo-server-express");
const { errorGeneric } = require("../../lib/middleware/error.middleware");
const { findById } = require("../../services/client.services");
const { verifyStock, verifySeller, createOrder, findAll, findOrderSeller,findOrderId, updateOrder, deleteOrder, findByState, topClient } = require("../../services/order.services");

module.exports = {
  Query: {
    getOrders: async () => {
        return await findAll()
    },
    getOrder: async (_, {id}, ctx ) => {
        const order = await findOrderId(id)
        const { client } = order
        const existClient = await findById(client);
        const correctSeller = await verifySeller(existClient, ctx);
        return order
    },
    getOrderBySeller: async (_, {}, ctx) => {
        return await findOrderSeller(ctx)
    },
    getOrderByState: async (_, {state}, ctx) => {
        return await findByState(state, ctx)
    },
    
  },
  Mutation: {
    newOrder: async (_, { input }, ctx) => {
      const { client } = input;
      const existClient = await findById(client);
      const correctSeller = await verifySeller(existClient, ctx);
      const stock = await verifyStock(input);
      return await createOrder(input, ctx)
    },
    updateOrder: async (_, { id, input }, ctx ) => {
        const order = await findOrderId(id)
        const { client } = order
        const existClient = await findById(client);
        const correctSeller = await verifySeller(existClient, ctx);
        const stock = await verifyStock(input);
        return await updateOrder(id, input)
    },
    deleteOrder: async (_, { id }, ctx ) => {
        const order = await findOrderId(id)
        const { client } = order
        const existClient = await findById(client);
        const correctSeller = await verifySeller(existClient, ctx);
        const result = await deleteOrder(id)
        return "Order Deleted"
    },
  },
};
