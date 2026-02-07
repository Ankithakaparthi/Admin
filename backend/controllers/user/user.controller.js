
import Order from '../../models/order.model.js';

export const placeOrder = async (req, res) => {
    try {

        const { userId, productId, quantity, totalPrice, price } = req.body;
        
        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const order = new Order({
            userId,
            productId,
            quantity,
            totalPrice,
            price
        });

        await order.save();

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};




export const getUserOrders = async (req, res) => {
    try {

        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "UserId required" });
        }

        const orders = await Order
            .find({ userId })
            .populate("productId");
        res.status(200).json(orders);

    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};