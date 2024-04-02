// routes/auth.js

const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Kullanıcı kaydı
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    await user.save()
    res.status(201).send("User registered successfully")
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Kullanıcı girişi
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found")
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error("Invalid credentials")
    const token = jwt.sign({ email: user.email }, process.env.SECRET)
    res.status(200).json({ token })
  } catch (err) {
    res.status(401).send(err.message)
  }
})

module.exports = router
