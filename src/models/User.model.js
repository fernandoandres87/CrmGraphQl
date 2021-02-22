const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
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
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    expirationDate: {
      type: Number,
      required: true,
      default: new Date().getTime() / 1000,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  return {
    ...user,
    expirationDate: undefined,
    password: undefined,
  };
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, process.env.APP_SECRET, {
    expiresIn: "5 hours",
  });
  const infoDecoded = jwt.decode(token);
  user.expirationDate = infoDecoded.exp;
  await user.save();
  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      const { password } = user;
      const salt = await bcrypt.genSalt(8);
      user.password = await bcrypt.hash(password, salt);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = model("User", UserSchema);
