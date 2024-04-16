const mongoose = require("mongoose")

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId türünde yapıldı
      ref: "User", // Referans modeli belirtildi (varsayılan olarak 'User')
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Workout", workoutSchema)
