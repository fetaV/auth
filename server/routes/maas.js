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
    const maaslar = await Maas.find()
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
    const user = await User.findOne({ email: req.user.email })

    const maasMiktari = req.body.maasMiktari

    const maas = new Maas({
      maasMiktari,
      user: user._id,
    })

    const yeniMaas = await maas.save()
    res.status(201).json(yeniMaas)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//Maaş Eksiltme
router.post("/eksi", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    const { yatirim, luks, ihtiyac } = req.body

    const maasEksi = new Maas({
      yatirim,
      luks,
      ihtiyac,
      user: user._id,
    })

    const eksi = await maasEksi.save()
    res.status(201).json(eksi)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Maaşları güncelle
// router.put("/", verifyToken, async (req, res) => {
//   try {
//     const updatedMaaslar = req.body.maaslar
//     for (const maas of updatedMaaslar) {
//       const existingMaas = await Maas.findById(maas._id)
//       if (!existingMaas) {
//         return res.status(404).send("Maaş bulunamadı.")
//       }
//       // Yatırım miktarını güncelle
//       existingMaas.yatirim -= maas.yatirim
//       await existingMaas.save()
//     }
//     res.status(200).send("Maaşlar güncellendi.")
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

module.exports = router
