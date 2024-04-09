// routes/workout.js

const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Workout = require("../models/Workout")

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
    const workouts = await Workout.find({ user: req.user.email })
    res.status(200).json(workouts)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Kullanıcının workout verisi eklemesi
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, reps, load } = req.body
    const existingWorkout = await Workout.findOne({ title })

    if (existingWorkout) {
      return res.status(400).json({ message: "Title is already exist" })
    }

    const workout = new Workout({
      title,
      reps,
      load,
      user: req.user.email,
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

module.exports = router
