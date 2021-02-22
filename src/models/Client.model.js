const { model, Schema } = require("mongoose");

const ClientSchema = Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

module.exports = model("Client", ClientSchema);
