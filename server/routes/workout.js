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

module.exports = router
