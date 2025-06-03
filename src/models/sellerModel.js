const { Schema, models, model } = require("mongoose");

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  storeName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const sellerModel = models.Seller || model("Seller", sellerSchema);

export default sellerModel;