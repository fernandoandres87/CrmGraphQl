const bcrypt = require("bcryptjs");
const { errorGeneric } = require("../lib/middleware/error.middleware");
const User = require("../models/User.model");
const Order = require("../models/Order.model");

exports.singUp = async (data, { User }) => {
  try {
    const user = await new User({
      ...data,
    });
    const result = await user.save();
    return result;
  } catch (err) {
    errorGeneric(err);
    throw new Error("Invalid Information");
  }
};
exports.singIn = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error("Incorrect username and/or password");
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new Error("Incorrect username and/or password");
    }

    const token = await user.generateAuthToken();
    return { token, user: { ...user.toJSON() } };
  } catch (err) {
    errorGeneric(err);
    throw new Error("Incorrect username and/or password");
  }
};
exports.logout = async (user) => {
  try {
    user.expirationDate = Math.floor(new Date().getTime() / 1000);
    await user.save();
    return "Session closed successfully";
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify the data entered");
  }
};
exports.findUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    errorGeneric(err);
  }
};
exports.topSeller = async () => {
  try {
    const user = await Order.aggregate([
      { $match: { state: "COMPLETED" } },
      {
        $group: {
          _id: "$seller",
          total: { $sum: "$total" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "seller",
        },
      },
      {
        $limit: 3,
      },
      { $sort: { total: -1 } },
    ]);
    return user;
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};
