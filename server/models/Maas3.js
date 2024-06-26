// server/models/Maas3.js

const mongoose = require("mongoose")

const MaasSchema = new mongoose.Schema({
  aciklama: String,
  kullanim: {
    type: Number,
    enum: [0, 1, 2], // 0: İhtiyaç, 1: Yatırım, 2: Lüks
  },
  miktar: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

module.exports = mongoose.model("Maas3", MaasSchema)
