const { model, Schema } = require("mongoose");

const ProductSchema = Schema(
  {
    brand:{
      type:String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    stock: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

ProductSchema.index({ model: 'text', brand:'text'})

module.exports = model("Product", ProductSchema);
