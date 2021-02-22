const { model, Schema } = require("mongoose");

const OrderSchema = Schema(
  {
    order: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    state: {
      type: String,
      default: "PENDING",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = model("Order", OrderSchema);
