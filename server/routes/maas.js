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

// Maaş getir
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }) // Kullanıcı bilgileri alındı
    const maaslar = await Maas.find({ user: user._id })
    res.json(maaslar)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Maaş düzenle
router.put("/:id", async (req, res) => {
  try {
    const updatedMaas = await Maas.findByIdAndUpdate(
      req.params.id,
      {
        maasMiktari: req.body.maasMiktari,
      },
      { new: true }
    )
    if (!updatedMaas) {
      return res.status(404).json({ message: "Maaş bulunamadı" })
    }
    res.json(updatedMaas)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Yeni maaş ekle
router.post("/", verifyToken, async (req, res) => {
  try {
    const maasMiktari = req.body.maasMiktari
    const user = await User.findOne({ email: req.user.email })

    const maas = new Maas({
      maasMiktari,
      user: user._id,
    })
    console.log("maas", maas)

    await maas.save()
    res.status(201).json(maas)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
