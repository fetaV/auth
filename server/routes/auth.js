const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

function validatePassword(password) {
  if (password.length < 8) return "Password must be at least 8 characters long."
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter."
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter."
  if (!/[0-9]/.test(password))
    return "Password must contain at least one digit."
  if (!/[^A-Za-z0-9]/.test(password))
    return "Password must contain at least one special character."
  return null
}

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    console.log("User deleted:", user)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/users/:id", async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findOneAndDelete({ _id: id }, { ...req.body })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    console.log("User updated:", user)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Kullanıcı kaydı
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    const passwordError = validatePassword(password)

    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message:
          "This email address is already in use. Please enter another email address.",
      })
    }
    if (passwordError) {
      return res.status(400).json({ message: passwordError })
    }
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    await user.save()
    res.status(201).send("User registered successfully")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Kullanıcı girişi
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found")
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error("Wrong password, please check it!")

    let isAdmin = false

    if (user.email === "admin@admin.com") {
      isAdmin = true
    }

    const token = jwt.sign(
      { email: user.email, username: user.username, isAdmin },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    )
    res.status(200).json({ token, username: user.username })
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
})

module.exports = router
