const { errorGeneric } = require("../lib/middleware/error.middleware");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");

exports.findAll = async () => {
  try {
    return await Order.find();
  } catch (error) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};
exports.findOrderId = async (id) => {
  try {
    return await Order.findById(id);
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};
exports.findOrderSeller = async (ctx) => {
  try {
    return await Order.find({ seller: ctx._id });
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};
exports.findByState = async (state, ctx) => {
  try {
    return await Order.find({ seller: ctx._id, state });
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
    F;
  }
};
exports.verifySeller = async (data, ctx) => {
  try {
    if (data.seller.toString() !== ctx._id) {
      throw new Error("Does not have Credentials");
    }
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};
exports.verifyStock = async (data) => {
  try {
    for await (const art of data.order) {
      const { id } = art;
      const product = await Product.findById(id);

      if (art.quantity > product.stock) {
        throw new Error(
          `The item: ${product.model} exceeds the available quantity`
        );
      } else {
        product.stock = product.stock - art.quantity;
      }
      await product.save();
    }
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};
exports.createOrder = async (data, ctx) => {
  try {
    const order = new Order(data);
    order.seller = ctx._id;
    return await order.save();
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};
exports.updateOrder = async (id, data) => {
  try {
    return await Order.findOneAndUpdate({ _id: id }, data, { new: true });
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};
exports.deleteOrder = async (id) => {
  try {
    return await Order.findOneAndDelete({ _id: id });
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};

