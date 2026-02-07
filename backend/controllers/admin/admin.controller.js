

import jwt from 'jsonwebtoken'
import User from '../../models/user.model.js';
import Order from "../../models/order.model.js";

export const getAllUsers = async (req, res) => {
  try {

    const { token } = req.body;

    console.log(token)

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin access only" });
    }

    const users = await User.find().select("-password").sort({ createdAt: -1 });;

    res.json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};



export const getAdminSales = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const orders = await Order.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const sales = orders.map(order => ({
      orderId: order._id,
      buyerName: order.userId?.name || "Unknown",
      productId: order.productId,
      price: order.price,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt
    }));

    res.json(sales);

  } catch (error) {
    console.error("Admin sales error:", error);
    res.status(500).json({ message: "Server error" });
  }
};