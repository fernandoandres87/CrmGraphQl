const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { success, error } = require("consola");
const typeDefs = require('./graphlql/typeDefs')
const resolvers = require('./graphlql/resolvers')
require("dotenv").config();
const app = express();
const connectedDb = require("./lib/mongoose");
const cors = require("cors");
const conectedDB = require("./lib/mongoose");
const AppModels = require('./models');
const { validateJwt } = require("./lib/utils");
const { errorGeneric } = require("./lib/middleware/error.middleware");

const port = process.env.PORT || 4000;
conectedDB();
app.disable("x-powered-by");
app.use(express.json()).use(express.urlencoded({ extended: false }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({ req }) => {
    const token = req.headers['authorization'] || ''
    if(token){
      try {
        const user = validateJwt(token)
        return user
      } catch (err) {
        errorGeneric(err)
      }
    }
    return {
      ...AppModels,
      token
    }
  }
});

const startApp = () => {
  try {
    server.applyMiddleware({ app, cors: true });

    app.listen(port, () =>
      success({
        badge: true,
        message: `Server started on PORT ${port}`,
      })
    );
  } catch (err) {
    error({
      badge: true,
      message: `Error: ${err.message}`
    });
  }
};

startApp();
