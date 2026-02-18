import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    customerName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },

    address: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      addressLine: { type: String, required: true },
      pinCode: { type: String, required: true },
      phone: { type: String },
    },

    user: {

      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true

    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

   paymentMethod: {
  type: String,
  enum: ["COD", "RAZORPAY"],   // or ["COD","ONLINE_PAYMENT"]
},


    orderNote: {
      type: String,
    },

    orderDate: {
      type: Date,
      default: Date.now

    },

    expectedDeliveryDate: {

      type: Date,
      required:true

    },

    orderStatus: {
      type: String,
      enum: ["PENDING", "PLACED","PACKED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
