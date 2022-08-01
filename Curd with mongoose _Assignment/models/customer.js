const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  firstName: {
    type: string,
    required: true,
  },
  lastName: {
    type: string,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
