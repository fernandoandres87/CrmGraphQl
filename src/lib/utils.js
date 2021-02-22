require('dotenv').config()
const jwt = require('jsonwebtoken')

const genericResponse ={
    data:{}
}

exports.prepareResponse = (data, key) => Object.assign({}, genericResponse, {data: {[key]:data}})

exports.validateJwt = async (token) => {
    return await jwt.verify(token, process.env.APP_SECRET);
  };