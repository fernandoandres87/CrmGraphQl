const { ApolloServer } = require("apollo-server-express");
const { errorGeneric } = require("../../lib/middleware/error.middleware");
const { validateJwt } = require("../../lib/utils");
const {
  singIn,
  singUp,
  logout,
  findUser,
  topSeller,
} = require("../../services/user.services");

module.exports = {
  Query: {
    getUser: async (_, { token }) => {
      const result = validateJwt(token);
      return result;
    },
    topSeller: async () => {
      return await topSeller()
    }
  },
  Mutation: {
    newUser: async (_, { input }, ctx) => {
      try {
        const result = await singUp(input, ctx);
        return result;
      } catch (err) {
        errorGeneric(err);
        throw new Error("Verify the data entered");
      }
    },
    authUser: async (_, { input }, ctx) => {
      try {
        const { token } = await singIn(input);
        return { token };
      } catch (err) {
        errorGeneric(err);
        throw new Error("Incorrect username and/or password");
      }
    },
    logoutUser: async (_, { id }, ctx) => {
      try {
        const user = await findUser(id);
        const result = await logout(user);
        return result;
      } catch (error) {
        errorGeneric(err);
        throw new Error("Verify the data entered");
      }
    }
  },
};
