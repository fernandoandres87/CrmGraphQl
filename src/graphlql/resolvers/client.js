const { ApolloServer } = require("apollo-server-express");
const { errorGeneric } = require("../../lib/middleware/error.middleware");
const {
  findAll,
  createClient,
  findOne,
  findClientSeller,
  findById,
  deleteClient,
  updateClient,
} = require("../../services/client.services");
const { topClient } = require("../../services/client.services");

module.exports = {
  Query: {
    getClients: async () => {
      return await findAll();
    },
    getClientSeller: async (_, {}, ctx) => {
      return await findClientSeller(ctx);
    },
    getClient: async (_, { id }, ctx) => {
      const client = await findById(id);

      if (client.seller.toString() !== ctx._id) {
        throw new Error("Does not have the credentials");
      }
      return client;
    },
    topClient: async () => {
      return await topClient()
  }
  },
  Mutation: {
    newClient: async (_, { input }, ctx) => {
      const client = await findOne(input);
      if (client) {
        throw new Error("The customer entered already exists");
      }
      return await createClient(input, ctx);
    },
    deleteClient: async (_, { id }, ctx) => {
      let client = await findById(id);

      if (client.seller.toString() !== ctx._id) {
        throw new Error("Does not have the credentials");
      }
      await deleteClient(id);
      return "Client Deleted";
    },
    updateClient: async (_, { id, input }, ctx) => {
      let client = await findById(id);

      if (client.seller.toString() !== ctx._id) {
        throw new Error("Does not have the credentials");
      }
      client = await updateClient(id, input);
      return client;
    },
  },
};
