import Order from "../models/Order.js";
import Product from "../models/Product.js";

//automatic delivery update

const autoUpdateDelivery = async (order) => {
  if (order.orderStatus !== "CANCELLED" &&
    order.orderStatus !== "DELIVERED" &&
    new Date() >= order.expectedDeliveryDate
  ) {

    order.orderStatus = "DELIVERED";
    await order.save();

  }
}

// Place Order Controller
export const placeOrder = async (req, res) => {
  try {
    // ✅ Destructure nested fields from frontend
    const { email, customerName, address, phone, paymentMethod, orderNote, items, totalAmount } = req.body;

    // ✅ BASIC VALIDATION
    if (
      !email ||
      !customerName?.firstName ||
      !customerName?.lastName ||
      !address?.country ||
      !address?.state ||
      !address?.city ||
      !address?.addressLine ||
      !address?.pinCode ||
      !paymentMethod ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Missing required order fields",
      });
    }

    console.log("Received orderData:", req.body);


    // 👉 Get product IDs from items
    const productIds = items.map(item => item.productId);

    // 👉 Fetch products from DB
    const products = await Product.find({ _id: { $in: productIds } });


    if (products.length !== productIds.length) {
      return res.status(400).json({ message: "Some products not found" });
    }


    // 👉 Find max delivery duration
    let maxDuration = 0;

    for (const product of products) {
      const duration = product.deliveryDuration || 2;
      if (duration > maxDuration) {
        maxDuration = duration;
      }
    }

    // 👉 Calculate expected delivery date
    const expectedDeliveryDate = new Date(Date.now());
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + maxDuration);



    // ✅ CREATE ORDER
    const order = await Order.create({
      email,
      customerName,
      address,
      phone,
      items,
      totalAmount,
      paymentMethod,
      orderNote,
      user: req.user._id,
      expectedDeliveryDate
    });

    // After creating the order
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { purchaseCount: 1 } });
    }

    // ✅ SUCCESS RESPONSE
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
};


export const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (order) {
      await autoUpdateDelivery(order);
    }

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }


    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    res.status(200).json({ order });

  } catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({ message: "server error" });
  }
}


// get all orders of a particular logged in user

export const getAllOrder = async (req, res) => {
  try {

    // it will chcek who is the user and based on the user it will give that users all orders

    const userId = req.user._id;

   const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    for (const order of orders) {
      await autoUpdateDelivery(order);
    }

    if (orders.length === 0)
      return res.status(404).json({ message: "There is no order from this User" })
    else
      return res.status(200).json({ success: true, orders });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Server Error" })
  }
}

//review of the product

export const canReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const order = await Order.findOne({

      user: userId,
      "items.productId": productId,
      orderStatus: "DELIVERED"


    })


    if (order) {
      return res.status(200).json({ canReview: true })
    } else {
      return res.status(200).json({ canReview: false })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}