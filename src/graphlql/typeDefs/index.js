const baseDefs = require('./baseDefs')
const user = require('./user')
const product = require('./product');
const client = require('./client');
const order = require('./order');

const typeDefs = [
    baseDefs,
    user,
    product,
    client,
    order
];

module.exports = typeDefs