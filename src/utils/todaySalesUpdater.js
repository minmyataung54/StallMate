const WalletHistory = require("../models/walletHistorySchema");

const updateTodaySales = async (sellerId, amount) => {
  try {
    
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    
    let todaySales = await WalletHistory.findOne({
      sellerId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (todaySales) {
      
      todaySales.amount += amount;
      await todaySales.save();
    } else {
     
      todaySales = new WalletHistory({
        sellerId,
        date: new Date(),
        amount,
      });
      await todaySales.save();
    }
    return todaySales.amount; 
  } catch (error) {
    console.error("Error updating today's sales:", error);
    throw new Error("Failed to update today's sales.");
  }
};

module.exports = updateTodaySales;