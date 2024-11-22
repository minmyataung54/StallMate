const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/orderSchema");
const { Menu } = require("../models/menuSchema");
const isLoggedIn = require("../middleware/authMiddleware");
const updateTodaySales = require("../utils/todaySalesUpdater"); // Import the utility
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.put("/:seller_id/orders", isLoggedIn, async (req, res) => {
  try {
    const customerId = req.user._id;
    const sellerId = req.params.seller_id;
    const { items, tableNumber, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided in the order." });
    }

    const menu = await Menu.findOne({ seller: sellerId });
    if (!menu) {
      return res.status(404).json({ error: "Menu not found for the given seller." });
    }

    let totalAmount = 0;
    const orderItems = items.map((item) => {
      const menuItem = menu.items.find(
        (menuItem) => menuItem._id.toString() === item.menuId
      );
      if (!menuItem) {
        throw new Error(`Menu item with ID ${item.menuId} not found for this seller.`);
      }
      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;
      return {
        menuId: menuItem._id,
        name: menuItem.name,
        name_en: menuItem.name_en,
        price: menuItem.price,
        quantity: item.quantity,
        notes: item.notes,
        imageUrl: menuItem.imageUrl,
      };
    });

    // Handle card payment logic (if applicable)
    if (paymentMethod === "card") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: "thb",
        payment_method: req.body.paymentMethodId,
        confirm: true,
      });

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          error: "Payment failed. Please try again or use a different payment method.",
          paymentStatus: paymentIntent.status,
        });
      }
    }

    // Create the new order
    const newOrder = new Order({
      customerId,
      sellerId,
      items: orderItems,
      totalAmount,
      paymentMethod,
      tableNumber,
    });

    await newOrder.save();

    // Update today's sales for the seller
    await updateTodaySales(sellerId, totalAmount);

    res.status(201).json({
      message: `Order placed successfully. An amount of ${totalAmount} THB has been recorded.`,
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
});

module.exports = router;


router.put("/:seller_id/orders/:order_id/completed",
  isLoggedIn,
  async (req, res) => {
    try {
      const sellerId = req.params.seller_id;
      const orderId = req.params.order_id;
      console.log("Marking order as completed:", orderId);

      
      const order = await Order.findOneAndUpdate(
        { _id: orderId, sellerId },
        { orderStatus: "completed" },
        { new: true } // Return the updated order
      );

      if (!order) {
        return res
          .status(404)
          .json({ error: "Order not found for the given seller" });
      }

      res.json({ message: "Order marked as completed successfully", order });
    } catch (error) {
      console.error("Error marking order as completed:", error);
      res.status(500).json({ error: "Failed to mark order as completed" });
    }
  }
);

router.get("/:seller_id/orders/completed", isLoggedIn, async (req, res) => {
  try {
    const sellerId = req.params.seller_id;

    console.log("Fetching orders for seller ID:", sellerId);

    const upcomingOrders = await Order.find({
      sellerId,
      orderStatus: "completed",
    }).sort({ createdAt: -1 });

    if (!upcomingOrders || upcomingOrders.length === 0) {
      return res.json({ message: "No completed orders found", orders: [] });
    }

    const ordersList = upcomingOrders.map((order) => ({
      orderId: order._id,
      customerId: order.customerId,
      items: order.items,
      totalAmount: order.totalAmount,
      tableNumber: order.tableNumber,
      createdAt: order.createdAt,
    }));

    res.json({
      message: "Completed orders fetched successfully",
      orders: ordersList,
    });
  } catch (error) {
    console.error("Error fetching completed orders:", error);
    res.status(500).json({ error: "Failed to fetch completed orders" });
  }
});
router.get("/:seller_id/orders/pending", isLoggedIn, async (req, res) => {
  try {
    const sellerId = req.params.seller_id;

    console.log("Fetching orders for seller ID:", sellerId);

    const pendingOrders = await Order.find({
      sellerId,
      orderStatus: "pending",
    }).sort({ createdAt: -1 });

    if (!pendingOrders || pendingOrders.length === 0) {
      return res.json({ message: "No pending orders found", orders: [] });
    }

    const ordersList = pendingOrders.map((order) => ({
      orderId: order._id,
      customerId: order.customerId,
      items: order.items,
      totalAmount: order.totalAmount,
      tableNumber: order.tableNumber,
      createdAt: order.createdAt,
    }));

    res.json({
      message: "Pending orders fetched successfully",
      orders: ordersList,
    });
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    res.status(500).json({ error: "Failed to fetch pending orders" });
  }
});
module.exports = router;
