// routes/workout.js

const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Workout = require("../models/Workout")
const User = require("../models/User") // Kullanıcı modeli eklendi

// Middleware: JWT doğrulama
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(403).send("Token required")
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token")
    req.user = decoded
    next()
  })
}

// Kullanıcının workout verilerini getirme
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }) // Kullanıcı bilgileri alındı
    const workouts = await Workout.find({ user: user._id }) // ObjectId kullanıldı
    res.status(200).json(workouts)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Kullanıcının workout verisi eklemesi
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, reps, load } = req.body
    const user = await User.findOne({ email: req.user.email }) // Kullanıcı bilgileri alındı
    const workout = new Workout({
      title,
      reps,
      load,
      user: user._id, // ObjectId kullanıldı
    })
    await workout.save()

    res.status(201).json(workout)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Kullanıcı workout veri düzenlemesi
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { title } = req.body
    const existingWorkout = await Workout.findById(id)

    if (title !== existingWorkout.title) {
      const isTitleExist = await Workout.exists({ title })
      if (isTitleExist) {
        return res.status(400).json({ message: "Title is already exist" })
      }
    }

    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true })

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" })
    }

    console.log("Workout updated:", workout)
    res.status(200).json(workout)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Kullanıcı workout veri silme
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" })
    }

    console.log("Workout deleted:", workout)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
