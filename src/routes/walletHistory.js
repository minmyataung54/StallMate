const express = require("express");
const WalletHistory = require("../models/walletHistorySchema");
const isLoggedIn = require("../middleware/authMiddleware");
const router = express.Router();


router.get("/:seller_id/wallet/sales", isLoggedIn, async (req, res) => {
  try {
    const sellerId = req.params.seller_id;
    
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todaySales = await WalletHistory.findOne({
      sellerId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalAmount = todaySales ? todaySales.amount : 0;

    res.status(200).json({
      message: "Today's sales amount fetched successfully.",
      totalAmount,
    });
  } catch (error) {
    console.error("Error fetching today's sales:", error);
    res.status(500).json({ error: "Failed to fetch today's sales." });
  }
});

module.exports = router;