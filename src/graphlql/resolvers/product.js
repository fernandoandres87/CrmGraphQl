const { ApolloServer } = require("apollo-server-express");
const { errorGeneric } = require("../../lib/middleware/error.middleware");
const {
  createProduct,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require("../../services/product.services");

module.exports = {
  Query: {
    getProducts: async () => {
      return await findAll();
    },
    getProduct: async (_, { id }) => {
      try {
        const product = await findById(id);
        return product;
      } catch (err) {
        errorGeneric(err);
        throw new Error("Verify the data entered");
      }
    },
    searchProduct: async (_, { text }) => {
      return await searchProduct(text)
    },
  },
  Mutation: {
    newProduct: async (_, { input }, ctx) => {
      try {
        const result = await createProduct(input);
        return result;
      } catch (err) {
        errorGeneric(err);
        throw new Error("Verify the data entered");
      }
    },
    updateProduct: async (_, { id, input }, ctx) => {
      try {
        const product = await findById(id);
        const result = await updateProduct(id, input);
        return result;
      } catch (err) {
        errorGeneric(err);
        throw new Error("Verify the data entered");
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        const product = await findById(id);
        const result = await deleteProduct(id);
        return result;
      } catch (err) {
        errorGeneric(err);
        throw new Error("Verify the data entered");
      }
    },
  },
};
