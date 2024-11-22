const mongoose = require("mongoose");

const walletHistorySchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true, default: 0 },
});

const WalletHistory = mongoose.model("WalletHistory", walletHistorySchema);
module.exports = WalletHistory;