const { errorGeneric } = require("../lib/middleware/error.middleware");
const Client = require("../models/Client.model");
const Order = require("../models/Order.model");

exports.findAll = async () => {
  try {
    const clients = await Client.find();
    return clients;
  } catch (err) {
    errorGeneric(err);
    throw new Error("Check the information");
  }
};
exports.findById = async (id) => {
  try {
    return await Client.findById(id);
  } catch (err) {
    errorGeneric(err);
    throw new Error("Check de information");
  }
};
exports.findOne = async (data) => {
  try {
    const { email } = data;
    return await Client.findOne({ email });
  } catch (err) {
    errorGeneric(err);
    throw new Error("Check the information");
  }
};
exports.createClient = async (data, ctx) => {
  try {
    const newClient = new Client(data);
    newClient.seller = ctx._id;
    return await newClient.save();
  } catch (err) {
    errorGeneric(err);
    throw new Error("Check the information");
  }
};
exports.findClientSeller = async (ctx) => {
  try {
    return await Client.find({ seller: ctx._id });
  } catch (error) {
    errorGeneric(err);
    throw new Error("Check the information");
  }
};
exports.deleteClient = async (id) => {
  try {
    const result = await Client.findOneAndDelete({ _id: id });
    return result;
  } catch (err) {
    errorGeneric(err);
    throw new Error("Check de information");
  }
};
exports.updateClient = async (id, data) => {
  try {
    const client = await Client.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return client;
  } catch (err) {
    errorGeneric(err);
    throw new Error("Check de information");
  }
};
exports.topClient = async () => {
  try {
    const client = await Order.aggregate([
      { $match: { state: "COMPLETED" } },
      {
        $group: {
          _id: "$client",
          total: { $sum: "$total" },
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "_id",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $limit: 5,
      },
      { $sort: { total: -1 } },
    ]);
    return client;
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};