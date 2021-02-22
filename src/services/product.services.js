const { errorGeneric } = require("../lib/middleware/error.middleware");
const Product = require("../models/Product.model");

exports.findAll = async () => {
  try {
    return await Product.find();
  } catch (err) {
    errorGeneric(err);
    throw new Error("Verify information");
  }
};

exports.findById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("The product does not exists");
    }
    return product;
  } catch (err) {
    errorGeneric(err);
    throw new Error("The product does not exists");
  }
};

exports.createProduct = async (data) => {
  try {
    const product = new Product({ ...data });
    return await product.save();
  } catch (err) {
    errorGeneric(err);
    throw new Error("Invalid Information");
  }
};

exports.deleteProduct = async (id) => {
  try {
    const result = await Product.findByIdAndDelete({ _id: id });
    return " Product Deleted";
  } catch (err) {
    errorGeneric(err);
    throw new Error("Invalid Information");
  }
};

exports.updateProduct = async (id, input) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });
    return product;
  } catch (err) {
    errorGeneric(err);
    throw new Error("Invalid Information");
  }
};

exports.searchProduct = async (text) => {
  try {
    const search = await Product.find({ $text: { $search: text}}).limit(10)
    if(!search){
      throw new Error('The product does not exists')
    }
    return search
  } catch (err) {
    errorGeneric(err);
    throw new Error("Invalid Information");
  }
};
