// server/routes/maas.js

const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Maas = require("../models/Maas") // Maas modeli eklendi

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

// Tüm maaşları getir
router.get("/", verifyToken, async (req, res) => {
  try {
    const maaslar = await Maas.find()
    res.json(maaslar)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Yeni maaş ekle
router.post("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })

    const maasMiktari = req.body.maasMiktari
    const yatirim = maasMiktari * 0.2
    const luks = maasMiktari * 0.3
    const ihtiyac = maasMiktari * 0.5

    const maas = new Maas({
      maasMiktari: req.body.maasMiktari,
      yatirim: yatirim,
      luks: luks,
      ihtiyac: ihtiyac,
      user: user._id,
    })

    const yeniMaas = await maas.save()
    res.status(201).json(yeniMaas)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
